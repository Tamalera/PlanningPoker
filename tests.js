/* UNIT TESTS mittelWertBerechnen() */
QUnit.test("mittelWertBerechnen(): pass mit korrekten Werten", function(
  assert
) {
  assert.equal(
    mittelWertBerechnen(8, 2),
    4,
    "Mittelwert berechnen mit Total = 8 und Zähler = 2, pass = 4"
  );
});

QUnit.test("mittelWertBerechnen(): fail mit falscher Berechnung ", function(
  assert
) {
  assert.notEqual(
    mittelWertBerechnen(10, 2),
    4,
    "Mittelwert berechnen mit Total = 10 und Zähler = 2, fail = 4"
  );
});

QUnit.test("mittelWertBerechnen: fail mit negativem Total", function(assert) {
  assert.notEqual(
    mittelWertBerechnen(-8, 2),
    4,
    "Mittelwert berechnen mit Total = -8 und Zähler = 2, fail = 4"
  );
});

QUnit.test("mittelWertBerechnen: fail mit negativem Zähler", function(assert) {
  assert.notEqual(
    mittelWertBerechnen(8, -2),
    4,
    "Mittelwert berechnen mit Total = 8 und Zähler = -2, fail = 4"
  );
});

QUnit.test("mittelWertBerechnen: fail mit Division durch Null", function(
  assert
) {
  assert.notEqual(
    mittelWertBerechnen(8, 0),
    0,
    "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = 0"
  );
  assert.notEqual(
    mittelWertBerechnen(8, 0),
    null,
    "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = null"
  );
  assert.notEqual(
    mittelWertBerechnen(8, 0),
    -0,
    "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = -0"
  );
  assert.notEqual(
    mittelWertBerechnen(8, 0),
    4,
    "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = 4"
  );
  assert.notEqual(
    mittelWertBerechnen(8, 0),
    NaN,
    "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = NaN"
  );
  assert.equal(
    mittelWertBerechnen(8, 0),
    Infinity,
    "Mittelwert berechnen mit Total = 8 und Zähler = 0, pass = Infinity"
  );
});

QUnit.test("mittelWertBerechnen: pass mit korrekten negativen Werten", function(
  assert
) {
  assert.equal(
    mittelWertBerechnen(-8, -2),
    4,
    "Mittelwert berechnen mit Total = -8 und Zähler = -2, pass = 4"
  );
});

QUnit.test("mittelWertBerechnen: errors mit Texteingabe", function(assert) {
  assert.throws(function() {
    mittelWertBerechnen("a", 2);
  }, "TypeError: Inputs have to be numbers!, mit total = 'a' und zähler = 2");
  assert.throws(function() {
    mittelWertBerechnen(8, "a");
  }, "TypeError: Inputs have to be numbers!, mit total = 8 und zähler = 'a'");
  assert.throws(function() {
    mittelWertBerechnen("a", "a");
  }, "TypeError: Inputs have to be numbers!, mit total = 'a' und zähler = 'a'");
  assert.throws(function() {
    mittelWertBerechnen("a", 2);
  }, "TypeError: Inputs have to be numbers!, mit total = char 'a' und zähler = 2");
});

QUnit.test("mittelWertBerechnen: errors mit boolean Werten", function(assert) {
  assert.throws(function() {
    mittelWertBerechnen(false, 2);
  }, "TypeError: Inputs have to be numbers!, mit total = false und zähler = 2");
  assert.throws(function() {
    mittelWertBerechnen(true, 2);
  }, "TypeError: Inputs have to be numbers!, mit total = true und zähler = 2");
  assert.throws(function() {
    mittelWertBerechnen(true, true);
  }, "TypeError: Inputs have to be numbers!, mit total = true und zähler = true");
  assert.throws(function() {
    mittelWertBerechnen(false, false);
  }, "TypeError: Inputs have to be numbers!, mit total = false und zähler = false");
});
/* END UNIT TESTS mittelWertBerechnen() */

/* UNIT TESTS rundenAufFibo() */
QUnit.test("rundenAufFibo(): pass mit korrekten Werten", function(assert) {
  assert.equal(rundenAufFibo(0), 0, "Runden von 0 auf 0, pass");
  assert.equal(rundenAufFibo(13), 13, "Runden von 13 auf 13, pass");
  assert.equal(rundenAufFibo(15), 13, "Runden von 15 auf 13, pass");
  assert.equal(rundenAufFibo(18), 21, "Runden von 18 auf 21, pass");
  assert.equal(rundenAufFibo(21), 21, "Runden von 21 auf 21, pass");
  assert.equal(
    rundenAufFibo(4),
    5,
    "Runden von 4 auf 5, pass, da im Zweifel, auf nächsthöhere Fibonaccizahl gerundet wird"
  );
  assert.notEqual(
    rundenAufFibo(4),
    3,
    "Runden von 4 auf 3, fail, da im Zweifel, auf nächsthöhere Fibonaccizahl gerundet wird"
  );
});

QUnit.test("rundenAufFibo(): fail mit negativen Werten", function(assert) {
  assert.notEqual(rundenAufFibo(-1), 0, "Runden von -1, fail");
});

QUnit.test("rundenAufFibo(): fail Texteingabe", function(assert) {
  assert.throws(function() {
    rundenAufFibo("a");
  }, "TypeError, da Texteingabe: 'a'");
});

QUnit.test("rundenAufFibo(): fail Chars", function(assert) {
  assert.throws(function() {
    rundenAufFibo("A");
  }, "TypeError, da Chareingabe: 'A'");
});

QUnit.test("rundenAufFibo(): fail booleans", function(assert) {
  assert.throws(function() {
    rundenAufFibo(true);
  }, "TypeError, da Boolean: true");
  assert.throws(function() {
    rundenAufFibo(false);
  }, "TypeError, da Boolean: false");
});
/* END UNIT TESTS rundenAufFibo() */