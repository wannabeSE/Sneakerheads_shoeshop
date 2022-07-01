import 'package:flutter/material.dart';
import 'package:sneakerheads/auth/customer_signin.dart';
import 'auth/customersignup.dart';
void main (){
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    initialRoute: '/customer_signup',
    routes: {
      '/customer_signup':((context) => const CustomerSignUp()),
      '/customer_signin':(context) => const CustomerSignIn(),
    },
  ));
}