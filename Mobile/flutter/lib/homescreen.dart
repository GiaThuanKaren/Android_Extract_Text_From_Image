import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'package:image_picker/image_picker.dart';
// import 'package:socket_io/socket_io.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:text_recognition/main.dart';
import './utils/cache.dart';
//
// void main() {
//   runApp(const MyApp());
// }
//
// class MyApp extends StatelessWidget {
//   const MyApp({Key? key}) : super(key: key);
//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false,
//       theme: ThemeData(
//         primarySwatch: Colors.green,
//       ),
//       home: const MyHomePage(),
//     );
//   }
// }

class MyHomePage2 extends StatefulWidget {
  const MyHomePage2({Key? key}) : super(key: key);

  @override
  State<MyHomePage2> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage2> {
  bool textScanning = false;
  IO.Socket? socket;
  TextEditingController codeNumberText = TextEditingController();
  XFile? imageFile;

  String scannedText = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Text Recognition example"),
      ),
      body: Center(
          child: SingleChildScrollView(
        child: GetSectioInput(),
      )),
    );
  }

  Widget GetSectioInput() {
    return Column(
      children: [
        getTextEdit(codeNumberText, "1234", const Icon(Icons.code),
            inputType: TextInputType.number),
        Container(
          height: 16,
        ),
        GetCodeButton(),
      ],
    );
  }

  Widget GetCodeButton() {
    return Stack(
      children: <Widget>[
        SizedBox(
          height: 45.0,
          child: RaisedButton(
            onPressed: () {
              print("Join Room Press");
              // print(emailTextEdit.value.text + " " + passwordTextEdit.value.text);
              HandleJoinRoom(codeNumberText.value.text);
            },
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(8.0))),
            color: Colors.black,
            splashColor: Colors.black,
            child: const Center(
              child: Text(
                "Continue",
                style: TextStyle(color: Colors.white, fontSize: 18.0),
              ),
            ),
          ),
        ),
//        isLoading
//            ? SpinKitFadingCircle(
//          color: ColorApp.whiteText,
//          size: 45.0,
//        )
//            : Container()
      ],
    );
  }

  void HandleJoinRoom(String idRoom) async {
    print(socket?.disconnected);
    socket?.emit("join-room", idRoom);
    Cache.instance.IdRoom = idRoom;
    Cache.instance.saveIDRoom().listen((event) {}, onDone: () {
      MoveToMainScreen();
    });
  }

  Widget getTextEdit(
      TextEditingController controller, String hint, Icon leftIcon,
      {TextInputType inputType = TextInputType.text, bool isPassword = false}) {
    return TextField(
      controller: controller,
      keyboardType: inputType,
      obscureText: isPassword,
      style: const TextStyle(color: Colors.red, fontSize: 18),
      decoration: InputDecoration(
          filled: false,
          prefixIcon: leftIcon,
          enabledBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.black, width: 2),
          ),
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.black12, fontSize: 18)),
    );
  }

  void GetConnectionSocket() {
    const URLServer = 'http://192.168.31.184:5000';
    socket = IO.io(
        URLServer,
        IO.OptionBuilder()
            .setTransports(['websocket']) // for Flutter or Dart VM
            .setExtraHeaders({'foo': 'bar'}) // optional
            .build());
    // Replace 'onConnect' with any of the above events.
    socket?.onConnect((_) {
      print('connect');
    });
    socket?.on("connecting", (data) {
      print("Connecting");
    });
    // socket.on("", (data) => null)
    socket?.on('connect_error', (data) {
      print(data);
    });
    socket?.onDisconnect((_) => print('disconnect'));
  }

  void MoveToMainScreen() {
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => MyApp()));
  }

  void getImage(ImageSource source) async {
    try {
      final pickedImage = await ImagePicker().pickImage(source: source);
      if (pickedImage != null) {
        textScanning = true;
        imageFile = pickedImage;
        setState(() {});
        getRecognisedText(pickedImage);
      }
    } catch (e) {
      textScanning = false;
      imageFile = null;
      scannedText = "Error occured while scanning";
      setState(() {});
    }
  }

  void getRecognisedText(XFile image) async {
    final inputImage = InputImage.fromFilePath(image.path);
    final textDetector = GoogleMlKit.vision.textDetector();
    RecognisedText recognisedText = await textDetector.processImage(inputImage);
    await textDetector.close();
    scannedText = "";
    for (TextBlock block in recognisedText.blocks) {
      for (TextLine line in block.lines) {
        scannedText = scannedText + line.text + "\n";
      }
    }
    // String idFromPre = Cache.instance.IdRoom;
    // print("Id Room From Ref ${idFromPre}");
    // socket?.emit('send-text', {idFromPre,scannedText});
    textScanning = false;
    setState(() {});
  }

  @override
  void initState() {
    print("Connecting Login Screen");
    GetConnectionSocket();
    super.initState();
  }
}
