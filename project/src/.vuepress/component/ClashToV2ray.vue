<template>
 <div>
  <el-input
    v-model="clashInput"
    class="content"
    autosize
    type="textarea"
    placeholder="请输入内容"
  />
  <div class="button">
    <el-button type="primary" size="large" @click="onclick">转换</el-button>
  </div>
  <el-input
    v-model="v2rayResult"
    class="content"
    autosize
    type="textarea"
    placeholder="结果"
  />
 </div>
      
  </template>
  
  <script lang="ts" setup>
  import { ref} from 'vue'
  import { ElInput, ElButton, ElMessage} from 'element-plus'
  import YAML from 'yaml'
  import {Base64} from 'js-base64';

  const clashInput = ref('')
  const v2rayResult = ref('')
  const onclick = () => {
    const clashInputYaml = YAML.parse(clashInput.value)
    v2rayResult.value=''
    clashInputYaml?.proxies.forEach(element => {
      // element.cipher+':'+element.password 进行base64
      const v2rayElement ='ss://'+Base64.encode(element.cipher+':'+element.password)+'@'+element.server+':'+element.port+'#'+encodeURI(element.name)
      v2rayResult.value+=v2rayElement+'\n'
    });
    clashInput.value=''
    if(v2rayResult.value) {
      navigator.clipboard.writeText(v2rayResult.value).then(() => {
        ElMessage.success('复制成功')
      })
    }
  }
  </script>

<style scoped>
.content {
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}



</style>