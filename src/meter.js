ko.bindingHandlers.digitInput = {
    init: function (element, valueAccessor) {
        $(element)
        .attr("maxlength", "1")
        .on("keydown", function (event) {
            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Allow: . ,
                (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        })
        .bind("input", function() {
                    var $this = $(this);
                    setTimeout(function() {
                        if ( $this.val().length >= parseInt($this.attr("maxlength"),10) )
                            $this.next("input").focus();
                    },0);
    });        
    }
};

var Meter = function(digitsLeftOfDP,digitsRightOfDP,countOfDials) {
    var self = this;

    self.dials = ko.observableArray();

    for(i=0;i<countOfDials;i++)
    {
        self.dials.push(new Dial(digitsLeftOfDP,digitsRightOfDP));
    }
};

var Dial = function(digitsLeftOfDP,digitsRightOfDP) {
    var self = this;

    self.digits = ko.observableArray();

    for(left=0;left<digitsLeftOfDP;left++)
    {
        self.digits.push(new Digit('left'));
    }        

    for(right=0;right<digitsRightOfDP;right++)
    {
        self.digits.push(new Digit('right'));
    }

    self.reading = ko.computed(function() {
        var reading = "";

        var leftDigits =  $.grep(self.digits(), function(digit) {return digit.css() == "left"});
        var rightDigits = $.grep(self.digits(), function(digit) {return digit.css() == "right"});

        $.each(leftDigits, function(index, value) {
                reading+=value.isValid() ? value.value() : "x";   
        });

        if (rightDigits.length>0)
        {
            reading +=".";

            $.each(rightDigits, function(index, value) {
                reading+=value.isValid() ? value.value() : "x";   
            }); 
        }

        return reading;
    });                        
};    

var Digit = function(css) {
    var self = this;

    self.value = ko.observable();
    self.css = ko.observable(css);

    self.isValid = ko.computed(function() {
        return !isNaN(parseFloat(self.value()));
    });
};