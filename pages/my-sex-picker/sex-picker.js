Component({
  data: {
    sexText: '',
    sexValue: '',
    sexTitle: '',
    sexs: [
      { label: '男职工', value: '1' },
      { label: '原法定退休年龄55周岁女职工', value: '2' },
      { label: '原法定退休年龄50周岁女职工', value: '3' },
    ],
  },

  methods: {
    onColumnChange(e) {
      console.log('picker pick:', e);
    },

    onPickerChange(e) {
      const { key } = e.currentTarget.dataset;
      console.log('picker change:', e.detail,e.detail.value[0], e.detail.label[0]);
      this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: e.detail.value[0],
        [`${key}Lable`]: e.detail.label[0],
        [`${key}Text`]: e.detail.label[0],
      });
      // this.triggerEvent('change', {value:e.detail.value[0]});
    },

    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },

    onTitlePicker() {
      this.setData({ sexVisible: true, cityTitle: '选择性别' });
    },
    
    getSexValue() {
      return this.data.sexValue
    }
  },
});
