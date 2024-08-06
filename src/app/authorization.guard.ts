import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authorizationGuard: CanActivateFn = (route, state) => {
  
const router = new Router();

const token = localStorage.getItem('token');
if(token){
  if(state.url.indexOf('admin')>0)
  {
    let user :any = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user.RoleId=='1')
    {
      return true;
    }
    //diff roleid
    else{
      router.navigate([''])
      return false;
    }
  }
  //link != admin
  else{
    if(state.url.indexOf('user')>0){
      let user :any = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user.RoleId=='2')
    {
      return true;
    }
    //diff roleid
    else{
      router.navigate([''])
      return false;
    }
    }
  }
    return false; //else if(state.url.indexOf('user')>0)
  
  
}

///gust user
else{

  //toaster.warning('please SingUp');
  router.navigate(['security/register']);
  return false
}

};
