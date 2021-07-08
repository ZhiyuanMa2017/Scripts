let formData = new FormData();
      formData.append("propId", "268");
      formData.append("propCount", 1);
      formData.append("roomId", 614135);
      fetch('https://www.douyu.com/japi/prop/donate/mainsite/v1', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        if (res && 'error' in res && res.error === 0) {
          console.log('成功赠送主播 : '+ 614135 + ' 一个荧光棒');
        } else {
          console.log('赠送失败 : ' + res.msg);
        }
      });