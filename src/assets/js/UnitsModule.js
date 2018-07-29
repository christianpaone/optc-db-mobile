import units from './common/units'
import details from './common/details'
import cooldowns from './common/cooldowns'
export default class UnitsModule {
  static getUnits (id) {
    let json = []
    var i = 1
    window.units.forEach(element => {
      if (element[0] !== '' && i < 5000) {
        if (typeof id !== 'undefined') {
          var boo = parseInt(id) === i
          if (boo) {
            json.push(this.createUnitObjectJson(element, i))
          }
        } else {
          json.push(this.createUnitObjectJson(element, i))
        }
        i++
      } else {
        i++
      }
    })
    return json
  }
  static createUnitObjectJson (element, i) {
    let str = '' + i++
    let pad = '0000'
    let detailUnit = window.details[i - 1]
    console.log(detailUnit)
    let ans = pad.substring(0, pad.length - str.length) + str
    let unit = {}
    unit['id'] = ans
    let name = element[0]
    let subname = null
    let split = name.split(',')
    if (split.length > 1) {
      subname = split[1]
      name = split[0]
    }
    // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ],
    unit['name'] = name
    unit['subname'] = subname
    let typ = element[1]
    unit['type'] = Array.isArray(typ) ? typ[0] + '/' + typ[1] : typ
    let cl = element[2]
    unit['class'] = Array.isArray(cl) ? cl[0] + '/' + cl[1] : cl
    unit['class1_image'] = Array.isArray(cl) ? require('./../../assets/img/classes/' + cl[0] + '.png') : require('./../../assets/img/classes/' + cl + '.png')
    unit['class2_image'] = Array.isArray(cl) && cl.length > 1 ? require('./../../assets/img/classes/' + cl[1] + '.png') : null

    unit['type1_image'] = Array.isArray(typ) ? require('./../../assets/img/types/' + typ[0] + '.png') : require('./../../assets/img/types/' + typ + '.png')
    unit['type2_image'] = Array.isArray(typ) && typ.length > 1 ? require('./../../assets/img/types/' + typ[1] + '.png') : null

    unit['hp'] = element[12]
    unit['atk'] = element[13]
    unit['rcv'] = element[14]
    unit['cost'] = element[4]
    unit['combo'] = element[5]
    unit['slots'] = element[6]
    unit['stars'] = element[3]
    unit['maxlvl'] = element[7]
    unit['maxExp'] = element[8]
    unit['lvl1HP'] = element[9]
    unit['lvl1ATK'] = element[10]
    unit['lvl1RCV'] = element[11]
    unit['captain'] = (typeof detailUnit === 'undefined') ? 'Not Available' : detailUnit.captain
    unit['special'] = {
      title: (typeof detailUnit === 'undefined') ? 'Not Available' : detailUnit.specialName,
      effect: (typeof detailUnit === 'undefined') ? 'Not Available' : detailUnit.special
    }
    if (i === 573 || i === 574) {
      unit['image'] = 'https://onepiece-treasurecruise.com/wp-content/uploads/f0' + ans + '.png'
      unit['image_full'] = 'https://onepiece-treasurecruise.com/wp-content/uploads/c0' + ans + '.png'
    } else {
      unit['image'] = 'https://onepiece-treasurecruise.com/wp-content/uploads/f' + ans + '.png'
      unit['image_full'] = 'https://onepiece-treasurecruise.com/wp-content/uploads/c' + ans + '.png'
    }
    return unit
  }
}
