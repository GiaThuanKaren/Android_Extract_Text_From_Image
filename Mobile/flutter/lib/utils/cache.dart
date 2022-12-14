import 'package:shared_preferences/shared_preferences.dart';


class Cache {
  Cache._();
  static final instance = Cache._();

  static const _KEY = "android_project_final";
static const _IDKEY = "android_project_final_key";
static const _IDROOMKEY = "android_project_final_key_id";
  String key = "";
  String deviceId = "";
  String IdRoom ="";
  Stream save() async* {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    if (key != null && key.isNotEmpty) {
      await pref.setString(_KEY, key);
    }

    yield true;
  }
  Stream saveDeviceId() async* {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    if (IdRoom != null && IdRoom.isNotEmpty) {
      await pref.setString(_KEY, IdRoom);
    }

    yield true;
  }
  Stream saveIDRoom() async* {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    if (IdRoom != null && IdRoom.isNotEmpty) {
      await pref.setString(_IDROOMKEY, IdRoom);
    }
    yield true;

  }
  Stream<bool> load() async* {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    key = pref.get(_KEY);
    deviceId = pref.get(_IDKEY);
    IdRoom=pref.get(_IDROOMKEY);
    yield true;
  }

  Stream clean() async* {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    pref.remove(_KEY);
    pref.remove(_IDKEY);
    yield true;
  }
}
