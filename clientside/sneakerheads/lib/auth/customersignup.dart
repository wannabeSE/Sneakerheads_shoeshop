import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
// import 'package:shared_preferences/shared_preferences.dart';
class CustomerSignUp extends StatefulWidget {
  const CustomerSignUp({ Key? key }) : super(key: key);

  @override
  State<CustomerSignUp> createState() => _CustomerSignUpState();
}
final GlobalKey <FormState> _formkey2= GlobalKey<FormState>();

String p = r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

final TextEditingController passwordController = TextEditingController();
final TextEditingController confirmpassController =  TextEditingController();
final TextEditingController firstnameController =  TextEditingController();
final TextEditingController lastnameController =  TextEditingController();
final TextEditingController emailController = TextEditingController();

RegExp regExp =RegExp(p);
String temp='';
bool observeText=true;
class _CustomerSignUpState extends State<CustomerSignUp> {
  Future signUp(String fname, String lname, String email, String password)async{
    if(_formkey2.currentState!.validate()){
      var res=await http.post(Uri.parse('http://10.0.2.2:8080/api/signup'),
      headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String,String>{
        'firstName':fname,
        'lastName':lname,
        'email':email,
        'password':password,
      }        
      )
    
      );
      if(res.statusCode==201){
        Fluttertoast.showToast(msg:'Account Created Succesfully');
      }
    }
    
  }
  @override
   Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(title: const Text(
        'Sign Up',
        style: TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.normal,
        color:Colors.white,
        fontFamily: 'Lobster'),
        ),
      ),
        backgroundColor: Colors.white,
        body: Form(
          key: _formkey2,
          child: Column(
          children:[
            Padding(
              padding: const EdgeInsets.all(7),
              child: TextFormField(
                controller: firstnameController,
                validator: ((value) {
                  if(value!.isEmpty){
                    return 'Please Enter First Name';
                  }else{
                    return null;
                  }
                }),
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide:const BorderSide(color: Colors.black87)
                  ),
                  labelText: 'firstname',
                ),
              ),
            ),
             Padding(
              padding: const EdgeInsets.all(6),
              child: TextFormField(
                controller: lastnameController,
                validator: ((value) {
                  if(value!.isEmpty){
                    return 'Please Enter Last Name';
                  }else{
                    return null;
                  }
                }),
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide:const BorderSide(color: Colors.black87)
                  ),
                  labelText: 'lastname',
                ),
              ),
            ),
             Padding(
              padding: const EdgeInsets.all(6),
              child: TextFormField(
                controller: emailController,
                
                validator: (value){
                  if(value!.isEmpty){
                    return 'Please enter your E-mail';
                  }else if(!regExp.hasMatch(value)){
                    return 'E-mail is invalid';
                  }
                  return null;
                },
                onChanged:(value) {},
                decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide:const BorderSide(color: Colors.black87)
                  ),
                labelText: 'E-mail',
                ),           
              ),
            ),
            Padding(padding: const EdgeInsets.all(6),
            child: TextFormField(
              obscureText: observeText,
              controller: passwordController,
              validator: ((value) {
                if(value!.isEmpty){
                  return 'Please enter a password';
                }else if(value.length<6){
                  return 'The password is too short';
                }else{
                  temp=value;
                  return null;
                }
                
              }),
              onChanged: (value){},
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide:const BorderSide(color: Colors.black87)
                  ),
                  hintText: 'Password',
                  suffixIcon: GestureDetector(
                    onTap: () {
                      
                      setState(() {
                        observeText=!observeText;
                      });
                    },
                    child: Icon(
                      observeText==true?
                      Icons.visibility:
                      Icons.visibility_off,
                      color: Colors.black,),
                  ),
                ),  
              ),
            ),
            Padding(padding: const EdgeInsets.all(6),
            child: TextFormField(
              obscureText: observeText,
              validator: (value) {
                if(value!=temp){
                  return 'The password does not match';
                }
                return null;
              },
                decoration:InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide:const BorderSide(color: Colors.black87)
                  ),
                  hintText: 'Re-enter Password',
                  suffixIcon: GestureDetector(
                    onTap: () {
                      
                      setState(() {
                        observeText=!observeText;
                      });
                    },
                    child:  Icon(
                      observeText==true?
                      Icons.visibility:
                      Icons.visibility_off
                      ,color: Colors.black,
                      ),
                  ),
                ),  
              ),
            ),
          
             const SizedBox(
                    height: 20,
                  ),
                  ElevatedButton(
                      onPressed: ()async {
                        if(firstnameController.text.isNotEmpty && lastnameController.text.isNotEmpty && emailController.text.isNotEmpty && passwordController.text.isNotEmpty)
                        {
                          
                          signUp(firstnameController.text, lastnameController.text, emailController.text, passwordController.text);
                          
                        }
                        
                      },
                      child: const Text('Sign Up')
                      ),
          ],      
              ),
        ),
    );
  }
}