export const scorePassword = (pass) => {
  var score = 0;
  if (!pass) return { score, variations: {} };

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
    // score += 5.0 / Math.min(1, letters[pass[i]] - (pass.length * 30) / 100);
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  var variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }

  //penalisa senhas sem variacoes de caracteres
  if (pass.length >= 8 && variationCount < 4) {
    score += (4 - variationCount) * -10;
    return { score, variations };
  }

  score += (variationCount - 1) * 10;

  return { score, variations };
};

export const validPasswordVariation = (variations) => {
  const { digits, lower, nonWords, upper } = variations;
  console.log(digits);
  const validationErrors = [];

  if (!digits) {
    validationErrors.push("A senha deve conter pelo menos um numeral");
  }

  if (!lower) {
    validationErrors.push("A senha deve conter pelo menos uma letra minuscula");
  }

  if (!upper) {
    validationErrors.push("A senha deve conter pelo menos uma letra maiscula");
  }

  if (!nonWords) {
    validationErrors.push(
      "A senha deve conter pelo menos um caractere especial"
    );
  }

  return validationErrors;
};
