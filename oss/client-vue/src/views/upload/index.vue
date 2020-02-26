<template>
  <div class="home">
    <el-upload class="upload-demo" :http-request="uploadFile" action="">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
// @ is an alias to /src
import { Upload, Button } from "element-ui";
import OSS from "ali-oss";
import { uploadApi } from "@/api";
import { BUCKET_NAME } from "@/constant";

export default {
  name: "home",
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button
  },
  mounted() {},
  methods: {
    async getToken() {
      const res = await uploadApi.getToken();
      if (res.status === 200) {
        return res.data;
      }
      return res.data;
    },
    async uploadFile({ file }) {
      console.log("===file", file);

      const res = await uploadApi.getToken();
      if (res.status === 200) {
        console.log("=====res", res);

        const { AccessKeyId, AccessKeySecret, SecurityToken } = res.data;
        let client = new OSS({
          accessKeyId: AccessKeyId,
          accessKeySecret: AccessKeySecret,
          bucket: BUCKET_NAME,
          stsToken: SecurityToken,
          region: "oss-cn-hangzhou"
        });
        console.log("=====client", client);
        console.log("=====client.multipartUpload", client.multipartUpload);

        client
          .multipartUpload(file.name, file)
          .then(function(result) {
            console.log(result);
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }
  }
};
</script>
