/*
 * Art-a-day - Generate a art prompt based on the current date.
 * Copyright (C) 2018 Erik Mossberg
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function isoformat(sometime : Date) : string {
  var dd : string = sometime.getDate().toString();
  var mm : string = (sometime.getMonth() + 1).toString();
  var yyyy : string = sometime.getFullYear().toString();

  if (mm.length == 1) {
    mm = `0${mm}`;
  }

  if (dd.length == 1) {
    dd = `0${dd}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}

function seed_today() : number {
  var now: Date = new Date();
  return string_to_random(isoformat(now));
}

function all_mediums()  {
  return ["Watercolor", "Watercolor pencils", "Acrylics", "Pastels",
          "Ink (b/w)", "Ink (multicolor)", "Fineliners (b/w)", "Fineliners (multicolor)",
          "Charcoal", "Graphite"];
}

function all_subjects() {
  return ["Bird", "Insect", "Street-scape", "Landscape", "Flower",
          "Aquatic creature", "Human(s)", "Animal", "Household item",
          "Plant"];
}

function gen_for_seed(seed : number) {
  var mediums = all_mediums();
  var subjects = all_subjects();
  var toreturn = [];

  for (var i = 0; i < 3; i++) {
    var medium = mediums.splice(seed % mediums.length, 1);
    var subject = subjects.splice(seed % subjects.length, 1);
    var msg = `${subject} using ${medium}`;
    toreturn.push(msg);
  }

  return toreturn;
}

function string_to_random(input : string) : number {
  var toreturn : number = 0xe24a2360; // Randomised once upon a time.

  for (var i = 0; i < input.length; i++) {
    var num : number = input.charCodeAt(i);
    toreturn = (toreturn ^ (num << 7)) * (toreturn ^ (num << 3)) * (toreturn ^ (num))
    toreturn = toreturn % 1200496909;  // Some large prime.
  }

  if (toreturn < 0) {
    // We want this to be useful to randomize indexes.
    toreturn = -toreturn;
  }

  return toreturn + 1637585023 % 1396102003;
}


export function aad_main() : void {
  var title = `For ${isoformat(new Date())}`;

  var prompts = gen_for_seed(seed_today());

  document.getElementById("title").innerHTML = title;

  document.getElementById("prompt1").innerHTML = prompts[0];
  document.getElementById("prompt2").innerHTML = prompts[1];
  document.getElementById("prompt3").innerHTML = prompts[2];

}