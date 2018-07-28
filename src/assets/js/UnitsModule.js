import units from './common/units';
import details from './common/details';
import cooldowns from './common/cooldowns';
export default class UnitsModule {
  static getUnits() {
    // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ],
    let json = [];
    let i = 1;
    window.units.forEach(element => {
      if (element[0] != "" && i < 5000) {
        var str = "" + i++;
        var pad = "0000";
        var ans = pad.substring(0, pad.length - str.length) + str;
        let unit = {};
        unit["id"] = ans;
        let name = element[0];
        let subname = null;
        let split = name.split(",");
        if (split.length > 1) {
          subname = split[1];
          name = split[0];
        }
        unit["name"] = name;
        unit["subname"] = subname;
        let typ = element[1];
        unit["type"] = Array.isArray(typ) ? typ[0] + "/" + typ[1] : typ;
        let cl = element[2];
        unit["class"] = Array.isArray(cl) ? cl[0] + "/" + cl[1] : cl;
        unit["class1_image"] = Array.isArray(cl) ? require("./../../assets/img/classes/" + cl[0] + ".png") : require("./../../assets/img/classes/" + cl + ".png");
        unit["class2_image"] = Array.isArray(cl) && cl.length > 1 ? require("./../../assets/img/classes/" + cl[1] + ".png") : null;

        unit["hp"] = element[12];
        unit["atk"] = element[13];
        unit["rcv"] = element[14];
        unit["cost"] = element[4];
        unit["combo"] = element[5];
        unit["slots"] = element[6];
        unit["stars"] = element[3];
        if (i == 573 || i == 574) {
          unit["image"] = "https://onepiece-treasurecruise.com/wp-content/uploads/f0" + ans + ".png";
          unit["image_full"] = "https://onepiece-treasurecruise.com/wp-content/uploads/c0" + ans + ".png";

        } else {
          unit["image"] = "https://onepiece-treasurecruise.com/wp-content/uploads/f" + ans + ".png";
          unit["image_full"] = "https://onepiece-treasurecruise.com/wp-content/uploads/c" + ans + ".png";
        }
        json.push(unit);
      } else {
        i++;
      }
    });
    return json;
  }
  static getUnitDetails(id) {
    let trueId = parseInt(id);
    let detail = window.details[trueId];
    let unit = window.units[trueId - 1]; //units.js start from index 0
    let unit_details = {};
    unit_details["id"] = parseInt(id);
    unit_details["image"] = "https://onepiece-treasurecruise.com/wp-content/uploads/c" + id + ".png";
    unit_details["name"] = unit[0];
    let typ = unit[1];
    unit_details["type"] = Array.isArray(typ) ? typ[0] + "/" + typ[1] : typ;
    let cl = unit[2];
    unit_details["class"] = Array.isArray(cl) ? cl[0] + "/" + cl[1] : cl;
    unit_details["hp"] = unit[12];
    unit_details["atk"] = unit[13];
    unit_details["rcv"] = unit[14];
    unit_details["cost"] = unit[4];
    unit_details["slots"] = unit[6];
    unit_details["stars"] = unit[3];
    return unit_details;
  }
}
