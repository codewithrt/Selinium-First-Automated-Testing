import { expect } from "chai";
import { Key, Select } from "selenium-webdriver";
import { By,Builder, logging } from "selenium-webdriver";

describe('My first  Script',()=>{
    let driver;

   before(async()=>{
        driver =  await new Builder().forBrowser('chrome').build();
   })

    it("Testing the Title",async()=>{
        await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
        let title = await driver.getTitle();
        expect(title).to.be.equal("Web form")

    })

    it("Testing the TextBox",async()=>{
        let Text = await driver.findElement(By.id("my-text-id"));
        await Text.sendKeys('selinium')
        let Pass = await driver.findElement(By.name("my-password"));
        await Pass.sendKeys("PassWord")
        let TextBox = await driver.findElement(By.name("my-textarea"));
        await TextBox.sendKeys("Hi there this is Rahul and having a testing with selinium")
    })
    it("ReadOnly one Testing",async()=>{
         // Expecting readonly here
         let readonly = await driver.findElement(By.name("my-readonly"));
         let readdata = await readonly.getAttribute("value");
         expect(readdata).to.be.equal("Readonly input");
         await readonly.sendKeys("dsfsff");
         readdata = await readonly.getAttribute("value");
         expect(readdata).to.be.equal("Readonly input");
    })
   
    it("Testing the Dropdown select",async()=>{
          // Selecting dropdown
        let objselect = await new Select(driver.findElement(By.name("my-select")));
        // selecting One based on text visible
        await objselect.selectByVisibleText("One")
        let selectedone = await objselect.getFirstSelectedOption();
        expect(await selectedone.getText()).to.be.equal("One");
        // changing the option based on index
        await objselect.selectByIndex(2)
         selectedone = await objselect.getFirstSelectedOption();
        expect(await selectedone.getText()).to.be.equal("Two");
        // changing the option again by value
        await objselect.selectByValue("3")
        selectedone = await objselect.getFirstSelectedOption();
       expect(await selectedone.getText()).to.be.equal("Three");
    })
    it("Testing the Disabled part",async()=>{
        let Text = await driver.findElement(By.name("my-disabled"));
        expect(await Text.isEnabled()).to.be.false;
    })
    it("Testing the Dropdown list",async()=>{
        let objdrop = await new Select(driver.findElement(By.name("my-datalist")));
        // await objdrop.sendKeys("San");
        await objdrop.element.sendKeys("San Francisco");
        // const lists = await objdrop.getOptions();
        // console.log(lists);
        let datalist =  await driver.findElement(By.id("my-options"));
        let newdatalist = await datalist.findElements(By.tagName("option"));
        expect(newdatalist.length).to.be.equal(5)
    })
    it("Testing the Fileinput",async()=>{
         let fileinput = await driver.findElement(By.name("my-file"));
         await fileinput.sendKeys("/Users/rahul.tembhurne/Documents/Vs Code/PXY.pdf")
         expect(await fileinput.getAttribute("value")).contain("PXY.pdf")
    })
    it("Testing the CheckBox",async()=>{
        let checkbox = await driver.findElement(By.id("my-check-1"));
        let defaultbox = await driver.findElement(By.id("my-check-2"));
        // console.log(await checkbox.isEnabled());
        expect(await checkbox.isSelected()).to.be.true;
        await checkbox.click();
        expect(await checkbox.isSelected()).to.be.false;
        await defaultbox.click();
        expect(await defaultbox.isSelected()).to.be.true;
    })
    it("Testing the radio",async()=>{
        let checkedradio = await driver.findElement(By.id("my-radio-1"));
        expect(await checkedradio.isSelected()).to.be.true;
        let deafultradio = await driver.findElement(By.id("my-radio-2"));
        expect(await deafultradio.isSelected()).to.be.false;
        deafultradio.click();
        expect(await checkedradio.isSelected()).to.be.false;
        expect(await deafultradio.isSelected()).to.be.true;
    })
    it("Testing the Color Picker",async()=>{
        let colorpicker = await driver.findElement(By.name("my-colors"));
        expect(await colorpicker.getAttribute("value")).to.be.equal("#563d7c");
        await colorpicker.sendKeys("#41B4A7")
        expect(await colorpicker.getAttribute("value")).to.be.equal('#41b4a7');
    })
    it('Testing the Date Picker',async()=>{
        let datepicker = await driver.findElement(By.name("my-date"));
        expect(await datepicker.getAttribute("value")).to.be.empty;
        await datepicker.sendKeys("07/07/2023")
        expect(await datepicker.getAttribute("value")).to.be.equal("07/07/2023");
    })
    it("Testing the Example Range",async()=>{
        let rangepicker = await driver.findElement(By.name("my-range"));
        expect(Number(await rangepicker.getAttribute("min"))).to.be.equal(0)
        expect(Number(await rangepicker.getAttribute('max'))).to.be.equal(10);
        expect(Number(await rangepicker.getAttribute('value'))).to.be.equal(5);
        await rangepicker.sendKeys(Key.RIGHT);
        await rangepicker.sendKeys(Key.RIGHT);
        expect(Number(await rangepicker.getAttribute('value'))).to.be.equals(7);
        // rangepicker.actions().move({x:-5}).perform()
    })
    it("Submit Button",async()=>{
        let submitButton = await driver.findElement(By.xpath("//button"));
        await submitButton.click();
        let res = await driver.findElement(By.xpath("//h1"));
        expect(await res.getText()).to.be.equal("Form submitted")
    })
})
