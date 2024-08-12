import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private fb: FormBuilder, private toastr:ToastrService) {
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
          
          // alert('Payment successful!');
        } else {
          this.toastr.error('Payment failed.');
          // alert('Payment failed.');
        }
      }
    }
  }

}
