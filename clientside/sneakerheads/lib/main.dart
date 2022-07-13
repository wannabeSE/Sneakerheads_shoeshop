import 'package:flutter/material.dart';
import 'package:sneakerheads/auth/customer_signin.dart';
import 'package:sneakerheads/demo.dart';
import 'auth/customersignup.dart';
import 'splashscreen/splash.dart';
void main (){
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    
    initialRoute: '/splash',
   
    routes: {
      '/splash':(context) => const SplashScreen(),
      '/customer_signup':((context) => const CustomerSignUp()),
      '/customer_signin':(context) => const CustomerSignIn(),
      '/demo':(context) => const Demo(),
    },
    theme:ThemeData(brightness: Brightness.dark),
  )
  );
}