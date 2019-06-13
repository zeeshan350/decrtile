import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { UserPage } from '../user/user';
import { ProfilePage } from '../profile/profile';
import { SignoutPage } from '../signout/signout';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  userPage = UserPage;
  contactPage = ContactPage;
  profilePage = ProfilePage;
  signoutPage = SignoutPage;

}
