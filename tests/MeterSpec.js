describe("Meter", function() {

  it("should support single tarrif meters", function() {
    var meter = new Meter(5,1,1);

    expect(meter.dials().length).toBe(1);
  });

  it("should support dual tarrif meters", function() {
    var meter = new Meter(5,1,2);

    expect(meter.dials().length).toBe(2);
  });

  it("should allow entry of a reading with no decimal places", function() {
    var meter = new Meter(5,0,1);

    var dial = meter.dials()[0];
    var digits = dial.digits();

    digits[0].value("1");
    digits[1].value("2");
    digits[2].value("3");
    digits[3].value("4");
    digits[4].value("5");

    expect(dial.reading()).toBe("12345");
  });    

  it("should allow entry of a reading with 1 decimal place", function() {
    var meter = new Meter(5,1,1);

    var dial = meter.dials()[0];
    var digits = dial.digits();

    digits[0].value("1");
    digits[1].value("2");
    digits[2].value("3");
    digits[3].value("4");
    digits[4].value("5");
    digits[4].value("6");

    expect(dial.reading()).toBe("12345.6");
  });      
});