import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, 
         AngularFireUploadTask } from 'angularfire2/storage';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../providers/global';

@Injectable()
export class DatabaseService {

    private userListRef = this.db.list<User>('user');

    constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage, public global: GlobalProvider) {}

    getUserList() {        
        return this.userListRef;
    }

    // getAddressState() {
    //     return this.addressStateRef;
    // }

    // addAddress(address: Address) {
    //     return this.addressListRef.push(address);
    // }

    // addState(state: State) {
    //     return this.addressStateRef.push(state);
    // }

    // updateAddress(address: Address) {
    //     return this.addressListRef.update(address.key, address);
    // }

    // updateState(state: State) {        
    //     return this.addressStateRef.update(state.key, state);
    // }

    // removeAddress(address: Address) {
    //     return this.addressListRef.remove(address.key);
    // }

    // removeState(state: State) {
    //     return this.addressStateRef.remove(state.key);
    // }

    // addImage(image): AngularFireUploadTask {
    //     let imgName = `files/${new Date().getTime()}.png`;
    //     return this.afStorage.ref(imgName).put(image);
    // }

    // deleteImage(orgImgName): Observable<any> {    
    //     var pathStart = orgImgName.indexOf("files%2F")
    //     var pathEnd = orgImgName.indexOf(".png") + 4;
    //     var path = orgImgName.substring(pathStart, pathEnd);
    //     path = path.replace("%2F", "/")        
    //     return this.afStorage.ref(path).delete();
    // }
}