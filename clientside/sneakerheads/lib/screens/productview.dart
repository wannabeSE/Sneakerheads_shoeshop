import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';


class ProductView extends StatefulWidget {
  const ProductView({ Key? key }) : super(key: key);

  @override
  State<ProductView> createState() => _ProductViewState();
}

class _ProductViewState extends State<ProductView> {
  // List <MainCatList>? cats;
  // List <Product>? prod;
  List? prod;
  getCategory()async{
    String url='http://10.0.2.2:8080/api/product/getproduct';
    var res= await http.get(Uri.parse(url));
    if(res.statusCode==201){
      var data= jsonDecode(res.body);
      print(data.runtimeType);
      // print(data[1]['name']);
      // productFromJson(data);
    }
    // print(data);
    // print('this the last feedback is ${data[1]['name']}');
    
    // List<Category> cat=[];
  //  setState(() {
  //    for(int i=0;i<data.length;i++){
  //     cat.add({
  //       'name':data[i]['name']
  //     });
  //    }
  //  });
    // return cat;
  }
  @override
  void initState(){
    getCategory();
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
     backgroundColor: Colors.black,
     body: SafeArea(
      child:Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          IconButton(onPressed: (){}, 
          icon:const Icon(Icons.arrow_back_ios_new_rounded, )),
          Padding(
                padding:const EdgeInsets.fromLTRB(10,20,10,50),
                child: Row(
                  children: [
                    RichText(
                      text:const TextSpan(
                        children: [
                          TextSpan(text: "Find Your\n",style: TextStyle(fontSize: 30,fontFamily: 'Montserrat',)),
                          TextSpan(text:"BEST PAIR",style: TextStyle(fontSize: 40,fontFamily: 'Montserrat',fontWeight: FontWeight.bold,color: Colors.greenAccent) )
         
                        ]
                       
                        
                      )
                      ),
                     
                  ],
                
                ),
              ),
             
              Padding(
                padding: const EdgeInsets.fromLTRB(10, 0, 10, 30),
                child: TextField(
                  decoration: InputDecoration(
                    border:OutlineInputBorder(
                        borderRadius: BorderRadius.circular(15),
                        borderSide: const BorderSide(color: Colors.white54),
                      ),
                      hintText: 'search',
                      suffixIcon:const Icon(Icons.search,color: Colors.white,)
                  ),
                ),
              ),
             const Padding(
                padding:EdgeInsets.all(10.0),
                child: SizedBox(
                  height: 30,
                  child: Text('Categories',style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold),),
                ),
              ),
              SizedBox(
                height: 30,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: prod!.length,
                  itemBuilder: ((context, index) => const Padding(
                    padding:  EdgeInsets.symmetric(horizontal: 10),
                    child: Text('hello',style: TextStyle(fontSize: 18, fontFamily: 'Montserrat',fontWeight: FontWeight.bold),),
                  )
                  )
                  ),
              )
        ],
      ) 
      ),
    );
  }
}