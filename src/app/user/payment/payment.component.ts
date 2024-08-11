import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/Services/booking.service';
import { Trip } from 'src/app/Services/admin.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
  
export class PaymentComponent implements OnInit {

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  paymentForm: FormGroup;

  trip: Trip|undefined;

  constructor(private fb: FormBuilder, private bookingService:BookingService, private router:Router, private toastr:ToastrService) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
async ngOnInit() {

  this.stripe = await loadStripe('pk_test_51PIJI1EkFRcV8XZriYbCri8qktbG7ZTatEJdhQMDa82ggQ8TzanAU9tcmpHNzidl4Jsd10tEuPqixKIo7rkDxbMG006r2A0UNk'); 
  if (this.stripe) {
    this.elements = this.stripe.elements();
    if (this.elements) {
      this.card = this.elements.create('card');
      if (this.card) {
        this.card.mount('#card-element');
      }
    }
  }
  const id=this.bookingService.IdTrip;
  this.bookingService.getTripById(id).subscribe(
    (res: Trip) => this.trip = res,
    (err) => console.log('error')
    
  );
  }

  async handlePayment() {
    if (this.stripe && this.card) {
      const result = await this.stripe.createToken(this.card);
  
      if (result?.error) {
        console.error('Payment error:', result.error);
      } else if (result?.token) {
        console.log('Payment token:', result.token);

        const response = await fetch('https://localhost:7159/api/Payment/ProcessPayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          token: result.token.id,
          amount: 1000 // Amount in cents, e.g., $10.00
        })        
      });
  
        const data = await response.json();
        console.log('Payment response:', data);

        if (data.success) {
          this.toastr.success('Payment successful!');
          //create booking
          const userInfo = localStorage.getItem('user');
          let UserId : any;
          if(userInfo){
            const userData = JSON.parse(userInfo);
            UserId = userData.Userid;
          }
          const body ={
            tripid:this.trip?.tripid,
            paymentstatus: 'Paid'
          };
          this.bookingService.createBooking(body).subscribe(
            (res:any)=> {
              this.toastr.success('Booking Sucessfully');
              this.router.navigate(['user/invoice'])

            },
            err=>{
              console.log('error: '+err)
              this.toastr.error('Booking failed. Please try again.');
            }
            );

        } else {
          this.toastr.error('Payment failed. Please try again.');
        }
      }
    }
  }
}
