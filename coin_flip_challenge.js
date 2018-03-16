function flip() {
  return Math.random() >= 0.5;
}

/**
  * {Function} randomNumber
  * 
  * @description Converts the input number into string of binary numbers ('01')
  *   and selects randomly over each character to create a new, shorter string, which
  *   always results in a shorter number when being converted back into decimal.
  * 
  * @param num, {Number} any integer between 1 and 1,000,000
  * @return {Number} a random number, lower than the input value
  * @reference Convert decimal to binary {Link} https://www.w3schools.com/js/js_bitwise.asp
  * 
  * @sequence
  * - converts the input number to binary.
  * - splits the binary into an array.
  * - walks the array and flips the coin.
  * - if false, ignores the value.
  * - if true, pushes the value into a new binary string.
  * - converts back the binary into decimal.
  *
  * @todos
  * - ensure variability when passing #2
*/
function randomNumber(num) {
  var min, max, new_num, binary_string, char_list, new_binary;
  min = 1;
  max = 1000000;

  if (num < min || num > max){
    throw "provided number is less than "+min+" or greater than "+max;
  }
  
  new_num       = num !== 1 ? num - 1 : 0;
  binary_string = (new_num >>> 0).toString(2);
  new_binary    = '';

  for(var i=0; i < binary_string.length; i++){
    if(!i || flip()){
      new_binary += binary_string[i];
    }
  }
  
  return parseInt(new_binary, 2);
}

/**
  * {Function} testAll
  * @assert {Number} Should be less than the input {Number}.
  * @return {Bool} Wether the test passed or not.
  *
*/
function testAll(){
  var result     = false;
  var totalTests = 1000000;
  var easy_hits  = 0;

  for(var i=1; i<1000000;i++){
    var randomized = randomNumber(i);
    if(randomized >= i){
      result = false;
      break;
    }
    if(randomized === i-1){
      easy_hits++;
    }
  }
  
  console.log(easy_hits+' out of '+totalTests+' where n-1')

  return result;
}

/**
  * {Function} testVariability
  * @assert {Number} Should be different than the previous one, at least once.
  * @return {Bool} Wether the test passed or not.
  *
*/
function testVariability(num){
  var result = false;
  var old_num = randomNumber(num);

  for(var i=1; i<1000000; i++){
    var new_num = randomNumber(num);
    if (old_num!==new_num){
      result = true;
      break;
    }
    old_num = new_num;
  }
  return result
}
