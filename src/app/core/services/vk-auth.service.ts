import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthMethods } from '../models/auth-methods.model';
import { UserMetadata } from '../models/user-metadata.model';
import { VkProfileInfo } from '../models/vk-profile-info.model';
import { UserState } from '../store/models/user-state.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VKAuth {
  constructor(private http: HttpClient, private auth: AuthService) { }

  public getProfileInfo(userId: string, accessToken: string): Observable<VkProfileInfo> {
    const url = environment.vk.api.apiUrl + environment.vk.api.usersGetEndpoint;

    const options = {
      params: new HttpParams({
        fromObject: {
          user_ids: String(userId),
          fields: 'photo_100',
          access_token: accessToken,
          v: '5.130'
        }
      })
    };

    return this.http.get<{
      response: {
        can_access_closed: boolean;
        first_name: string;
        id: number;
        is_closed: boolean;
        last_name: string;
        photo_100: string;
      }[]
    }>(url, options).pipe(
      map(response => {
        const vkProfileInfoResponse = response.response[0];
        const vkProfileInfo: VkProfileInfo = {
          canAccessClosed: vkProfileInfoResponse.can_access_closed,
          firstName: vkProfileInfoResponse.first_name,
          id: vkProfileInfoResponse.id,
          isClosed: vkProfileInfoResponse.is_closed,
          lastName: vkProfileInfoResponse.last_name,
          photo100: vkProfileInfoResponse.photo_100
        };
        return vkProfileInfo;
      }),
      catchError(error => {
        console.log('error');
        return throwError('error when retriewing user profile', error);
      })
    );
  }

  public setUserData(id: string, email: string, accessToken: string): Promise<UserState> {
    return this.getProfileInfo(id, accessToken).toPromise().then(
      vkProfileInfo => {

        const userMetadata = {
          id,
          email,
          displayName: vkProfileInfo.firstName + vkProfileInfo.lastName,
          photoURL: vkProfileInfo.photo100
        };

        return this.auth.setUserData(userMetadata, AuthMethods.vk, accessToken);

      }
    );
  }
}
