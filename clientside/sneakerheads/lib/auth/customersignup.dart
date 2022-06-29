import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
class CustomerSignUp extends StatefulWidget {
  const CustomerSignUp({ Key? key }) : super(key: key);

  @override
  State<CustomerSignUp> createState() => _CustomerSignUpState();
}
final _formkey2= GlobalKey<FormState>();

String p = r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

final TextEditingController passwordController = TextEditingController();
final TextEditingController confirmpassController =  TextEditingController();
final TextEditingController firstname =  TextEditingController();
final TextEditingController lastname =  TextEditingController();
final TextEditingController emailController = TextEditingController();

RegExp regExp =RegExp(p);
String temp='';
bool observeText=true;
class _CustomerSignUpState extends State<CustomerSignUp> {
  // void signUp()async{
  //   String url='localhost:8080/api/signup'; 
  //   SharedPreferences sharedPreferences=await SharedPreferences.getInstance();

  //   Map body={'firstName':firstname,'lastName':lastname,'email':emailController,'password':passwordController};
  //   var jsonresponse;
  //   var res= await http.post(url,);
  // }
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
                }else if(value.length<8){
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
                      onPressed: () {
                        if(emailController.text.isNotEmpty && passwordController.text.isNotEmpty)
                        {
                          // validation(emailController.text,passwordController.text);
                          
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