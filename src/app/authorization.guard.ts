import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authorizationGuard: CanActivateFn = (route, state) => {
  
const router = new Router();
//let toaster:ToastrService = inject(ToastrService);

const token = localStorage.getItem('token');
if(token){
  if(state.url.indexOf('admin')>0)
  {
    let user :any = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user.RoleId=='1')
    {
      //toaster.success('Welcome in admin Page');
      return true;
    }
    //diff roleid
    else{
      //toaster.warning('this page for admin');
      router.navigate([''])
      return false;
    }
  }
  //link != admin
  
    return false; //else if(state.url.indexOf('user')>0)
  
  
}

///gust user
else{

  //toaster.warning('please SingUp');
  router.navigate(['security/register']);
  return false
}

};
