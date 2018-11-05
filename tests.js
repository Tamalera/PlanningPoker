/* UNIT TESTS mittelWertBerechnen() */
QUnit.test( "mittelWertBerechnen(): pass mit korrekten Werten", function( assert ) {
  assert.equal(mittelWertBerechnen(8, 2), 4, "Mittelwert berechnen mit Total = 8 und Zähler = 2, pass = 4");
});

QUnit.test( "mittelWertBerechnen(): fail mit falscher Berechnung ", function( assert ) {
  assert.notEqual(mittelWertBerechnen(10, 2), 4, "Mittelwert berechnen mit Total = 10 und Zähler = 2, fail = 4");
});

QUnit.test( "mittelWertBerechnen: fail mit negativem Total", function( assert ) {
  assert.notEqual(mittelWertBerechnen(-8, 2), 4, "Mittelwert berechnen mit Total = -8 und Zähler = 2, fail = 4");
});

QUnit.test( "mittelWertBerechnen: fail mit negativem Zähler", function( assert ) {
  assert.notEqual(mittelWertBerechnen(8, -2), 4, "Mittelwert berechnen mit Total = 8 und Zähler = -2, fail = 4");
});

QUnit.test( "mittelWertBerechnen: fail mit Division durch Null", function( assert ) {
  assert.notEqual(mittelWertBerechnen(8, 0), 0, "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = 0");
  assert.notEqual(mittelWertBerechnen(8, 0), null, "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = null");
  assert.notEqual(mittelWertBerechnen(8, 0), -0, "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = -0");
  assert.notEqual(mittelWertBerechnen(8, 0), 4, "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = 4");
  assert.notEqual(mittelWertBerechnen(8, 0), NaN, "Mittelwert berechnen mit Total = 8 und Zähler = 0, fail = NaN");
  assert.equal(mittelWertBerechnen(8, 0), Infinity, "Mittelwert berechnen mit Total = 8 und Zähler = 0, pass = Infinity");
});

QUnit.test( "mittelWertBerechnen: pass mit korrekten negativen Werten", function( assert ) {
  assert.equal(mittelWertBerechnen(-8, -2), 4, "Mittelwert berechnen mit Total = -8 und Zähler = -2, pass = 4");
});

QUnit.test( "mittelWertBerechnen: fail mit Texteingabe", function( assert ) {
  assert.notEqual(mittelWertBerechnen("a", 2), 4, "Mittelwert berechnen mit Total = 'a' und Zähler = 2, fail = 4");
  assert.notEqual(mittelWertBerechnen(8, "a"), 4, "Mittelwert berechnen mit Total = 8 und Zähler = 'a', fail = 4");
  assert.notEqual(mittelWertBerechnen("a", "a"), 1, "Mittelwert berechnen mit Total = 'a' und Zähler = 'a', fail = 1");
  assert.notEqual(mittelWertBerechnen("a", "a"), NaN, "Mittelwert berechnen mit Total = 'a' und Zähler = 'a', fail = NaN, da mit String keine Division möglich");
});


/* UNIT TESTS rundenAufFibo() */
QUnit.test( "rundenAufFibo(): pass mit korrekten Werten", function( assert ) {
  assert.equal(rundenAufFibo(0), 0, "Runden von 0 auf 0, pass");
  assert.equal(rundenAufFibo(13), 13, "Runden von 13 auf 13, pass");
  assert.equal(rundenAufFibo(15), 13, "Runden von 15 auf 13, pass");
  assert.equal(rundenAufFibo(18), 21, "Runden von 18 auf 21, pass");
  assert.equal(rundenAufFibo(21), 21, "Runden von 21 auf 21, pass");
  assert.equal(rundenAufFibo(4), 5, "Runden von 4 auf 5, pass, da im Zweifel, auf nächsthöhere Fibonaccizahl gerundet wird");
  assert.notEqual(rundenAufFibo(4), 3, "Runden von 4 auf 3, fail, da im Zweifel, auf nächsthöhere Fibonaccizahl gerundet wird");
});

QUnit.test( "rundenAufFibo(): fail mit negativen Werten", function( assert ) {
  assert.notEqual(rundenAufFibo(-1), 0, "Runden von -1, fail");
});

QUnit.test( "rundenAufFibo(): fail Texteingabe", function( assert ) {
  assert.notEqual(rundenAufFibo("a"), 0, "Runden von 'a', fail");
});

QUnit.test( "rundenAufFibo(): fail Chars", function( assert ) {
  assert.notEqual(rundenAufFibo('A'), 55, "Runden von Char 'A' (entspricht 65), fail");
});

QUnit.test( "rundenAufFibo(): fail booleans", function( assert ) {
  assert.notEqual(rundenAufFibo(true), 1, "Runden von true (entspricht 1), fail");
  assert.notEqual(rundenAufFibo(false), 0, "Runden von false (entspricht 0), fail");
});