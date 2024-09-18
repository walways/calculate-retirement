Component({
  data: {
    isDisabled:false
  },
  methods: {
    onTab() {
      this.triggerEvent('change', {});
    }


  }
});
