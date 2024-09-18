import Toast from '../../components/toast/index';


function calculateRetirement(yearOfBirth, monthOfBirth, type) {
  const monthDiff = (fromYear, fromMonth, toYear, toMonth) => {
    return (toYear - fromYear) * 12 + toMonth - fromMonth;
  };

  const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
  };

  let retirementAge = '';
  let retirementTime = '';
  let delayMonths = 0;
  // let needPay=0

  if (type === 'male') {
    if (yearOfBirth < 1965) {
      retirementAge = '60岁';
      delayMonths = 0;
   //   needPay = 20;

    } else if (yearOfBirth > 1976) {
      retirementAge = '63岁';
      delayMonths = 36;
   //   needPay = 25;
    } else {
      const diff = Math.ceil(monthDiff(1965, 1, yearOfBirth, monthOfBirth) / 4);
      const extraYears = Math.floor(diff / 12);
      const extraMonths = diff % 12;
      retirementAge = `${60 + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ''}`;
      delayMonths = diff;
    }
  } else if (type === 'female55') {
    if (yearOfBirth < 1970) {
      retirementAge = '55岁';
      delayMonths = 0;
    //  needPay = 20;
    } else if (yearOfBirth > 1981) {
      retirementAge = '58岁';
      delayMonths = 36;
    //  needPay = 25;
    } else {
      const diff = Math.ceil(monthDiff(1970, 1, yearOfBirth, monthOfBirth) / 4);
      const extraYears = Math.floor(diff / 12);
      const extraMonths = diff % 12;
      retirementAge = `${55 + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ''}`;
      delayMonths = diff;
    //  needPay = 25;
    }
  } else if (type === 'female50') {
    if (yearOfBirth < 1975) {
      retirementAge = '50岁';
      delayMonths = 0;
      //needPay = 20;
    } else if (yearOfBirth > 1984) {
      retirementAge = '55岁';
      delayMonths = 60;
     // needPay = 25;
    } else {
      const diff = Math.ceil(monthDiff(1975, 1, yearOfBirth, monthOfBirth) / 2);
      const extraYears = Math.floor(diff / 12);
      const extraMonths = diff % 12;
      retirementAge = `${50 + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ''}`;
      delayMonths = diff;
     // needPay = ;
    }
  }

  const retirementStartDate = addMonths(
    new Date(yearOfBirth, monthOfBirth - 1),
    (type === 'male' ? 60 : type === 'female55' ? 55 : 50) * 12 + delayMonths,
  );
  retirementTime = `${retirementStartDate.getFullYear()}年${retirementStartDate.getMonth() + 1}月`;

  const currentDate = new Date();

  const difference = retirementStartDate - currentDate;
  // 将差异转换为年和月
  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));

  

  return {
    retirementAge,
    retirementTime,
    delayMonths: `${years}年${months}月`,
  };
}

Page({
  data: {
    selectedDateTime: "",
    selectedSex:"",
    showRes:false,
    showLable:"",
    retirementAg:"", // 退休年龄
    retirementDate:"",  // 退休日期
    monthYearsUntilRetirement: "",//距离退休年月
   // monthYearsUntilPensionContribution: ""//个人需要交年月
  },

  onTabButton() {
    const myTimePicker = this.selectComponent('#my-time-picker');
    const mySexPicker = this.selectComponent('#my-sex-picker');
    const myButton = this.selectComponent('#my-button');
  
    if (myTimePicker.getTimeValue() == "") {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入出生日期',
      });
      return;
    }

    if (mySexPicker.getSexValue() == "") {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入性别',
      });
      return;
    }
    //设置为禁用
    myButton.setData({
      isDisabled:true
    })

    let date1 = ""
    date1 = myTimePicker.getTimeValue();
    console.log("date1",date1)
    let [year, month] = date1.split("-");
    // 获取性别
    let sexValue = mySexPicker.getSexValue()

    let sexType = ""

    console.log("type",sexType)

    if (sexValue == 1) {
      sexType = "male"
    } else if(sexValue == 2) {
      sexType = "female50"
    } else if (sexValue == 3){
      sexType = "female55"
    }

   let res = {
    retirementAge:"",
    retirementTime:"",
    delayMonths:0
   }
   res = calculateRetirement(year,month,sexType);

    this.setData({
      selectedDateTime: myTimePicker.getTimeValue(),
      selectedSex:mySexPicker.getSexValue(),
      showRes:true,
      showLable:"计算结果:",
      retirementAg:res.retirementAge,
      retirementDate:res.retirementTime,
      monthYearsUntilRetirement:res.delayMonths,
    //  monthYearsUntilPensionContribution:res.needPay
    })
  },
});

