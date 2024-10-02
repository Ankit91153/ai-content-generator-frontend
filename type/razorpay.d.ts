declare module 'razorpay' {
    interface RazorpayOptions {
      key_id: string;
      key_secret: string;
    }
  
    class Razorpay {
      constructor(options: RazorpayOptions);
      // Define other methods and properties as per your need
    }
  
    export = Razorpay;
  }
  