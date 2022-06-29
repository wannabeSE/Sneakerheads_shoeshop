import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
class CustomerSignIn extends StatefulWidget {
  const CustomerSignIn({ Key? key }) : super(key: key);

  @override
  State<CustomerSignIn> createState() => _CustomerSignInState();
}
final GlobalKey <FormState> _formkey= GlobalKey<FormState>();
//final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
String p = r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
bool observeText=true;
final TextEditingController emailController = TextEditingController();
final TextEditingController passwordController = TextEditingController();
RegExp regExp = RegExp(p);

class _CustomerSignInState extends State<CustomerSignIn> {
  void login(String email, String password) async{
    final FormState? _form = _formkey.currentState;
    if(_form!.validate()){
    var res= await http.post(Uri.parse('http://10.0.2.2:8080/api/signin'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body:jsonEncode(<String,String> {
      'email':email,
      'password':password,
    }
    )
    );
    print(res.body);
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text(
        'Sign In',
        style: TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.normal,
        color:Colors.white,
        fontFamily: 'Lobster'),
        ),
      ),
        backgroundColor: Colors.white,
        body: Form(
          key: _formkey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
          children:[
             Padding(
              padding: const EdgeInsets.all(8),
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
                decoration:InputDecoration(
                  border:OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: const BorderSide(color: Colors.black87)
                  ),
                  labelText: 'E-mail',
                ),           
              ),
            ),
            Padding(padding: const EdgeInsets.all(8),
            child: TextFormField(
              obscureText: observeText,
              controller: passwordController,
              validator: ((value) {
                if(value!.isEmpty){
                  return 'Please Enter Your Password';
                }else{
                  return null;
                }
              }),
                decoration: InputDecoration(
                  border:OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: const BorderSide(color: Colors.black87)
                  ),
                  labelText: 'Password',
                  suffixIcon: GestureDetector(
                      onTap: () {
                        FocusScope.of(context).unfocus();
                        setState(() {
                          observeText=! observeText;
                        });
                      },
                      child: Icon(
                        observeText==true?
                         Icons.visibility:
                         Icons.visibility_off,
                         color: Colors.black,
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
                        if(emailController.text.isNotEmpty && passwordController.text.isNotEmpty){
                        // validation(emailController.text, passwordController.text);
                          login(emailController.text,passwordController.text);
                        }
                      },
                      child: const Text('Log In')
                      ),
            const SizedBox(height: 20),
            const Text("Don't have an account?",style: TextStyle(fontSize: 15),),
            const SizedBox(height: 10),
             ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/create_account');
                        
                      },
                      child: const Text('Create An Account'),
                      ),
          ],      
              ),
        ),
    );
  }
}