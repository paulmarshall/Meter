# Meter

An example of a electric/gas meter implemented in javascript.

Stack:
* VS Code
* GitHub for Windows
* javascript
* jQuery 2.1.0 / knockout 3.0.0

Simple simple HTML markup, binds to a view model, Meter. Meter is comprised of a number of Dials (as a meter can support both single and dual tarrifs). A Dial is made up of a numbe rof Digits.

Markup is simple:

```HTML
        <div id="meter" data-bind='foreach: dials'>
            <div class="dial"> 
                <span data-bind='text: reading'></span>
                <!-- ko foreach: digits -->
                    <input data-bind='digitInput, css: css, value: value, valueUpdate: "afterkeydown"'/>
                <!-- /ko -->
            </div>
        </div>    
```

View model is even simpler:
```javascript
        <script>
        $(function() {
            var meter = new Meter(5,1,2);
            ko.applyBindings(meter, $("#meter")[0]); 
        });
        </script>   
```

Meter takes 3 arguments:
* Count of digits to the left of the decimal point
* Count of digits to the right of the decimal point
* Number of dials

Meter makes available readings from each of it's dials. If an entry is invalid, an "x" is displayed.

The input fields restrict entry to one numeric character. Once entered, focus moves to the next field.