<template>
  <div v-if="$route.params.planCount == '0'" class="content">
    <div class="img"></div>
    <div>暂无无监测方案，<a @click="show"> 请点我添加</a>监测方案</div>
  </div>
  <div v-else class="flex layout">
    <!-- <DetailListVue
      v-for="i in planCount"
      :ref="(ref) => detailListRef && (detailListRef[i] = ref)"
      :key="i"
      :count="i"
      @save="save"
    /> -->
    <div class="w-480px bg-[var(--tg-default-bg)] shrink-0"></div>
    <div class="flex-1">
      <webview
        class="w-full h-100%"
        src="https://web.telegram.org/a/#?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3DTGcsdome&post=30"
      ></webview>
    </div>
    <div class="w-480px bg-[var(--tg-default-bg)] shrink-0">
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :default-config="toolbarConfig"
          mode="default"
        />
        <Editor
          v-model="valueHtml"
          style="height: 500px; overflow-y: hidden"
          :default-config="editorConfig"
          mode="default"
          @onCreated="handleCreated"
        />
      </div>
      <el-button type="primary" @click="saveDocx"> 生成HTML文件 </el-button>
      <el-button type="primary" @click="screenshotStatus = true"> 截图 </el-button>
      <!--截图组件-->
      <screen-short
        v-if="screenshotStatus"
        @destroy-component="destroyComponent"
        @get-image-data="getImg"
      ></screen-short>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ADD_DIALOG } from '@/components/dialog'
// import DetailListVue from './components/DetailList.vue'
import AddPlan from './components/AddPlan.vue'
// import usePlanStore from '@/store/common/usePlan'
// import { updatePlan } from '@/apis'
// import { SUCCESS_CODE } from '@/constants'
// import mitts from '@/utils/mitts'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'

const saveDocx = () => {
  asBlob(valueHtml.value).then((data) => {
    saveAs(data, '实施方案.docx')
  })
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(
  '<p>hello</p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABf6SURBVHgB7Z1fiFTl/8ef+bN/ZtfU1VbWXCuXRUGNRbSLvDBDvAjUq+pOKAMDoyBYr6trL4IkL7xQwYvA8CrByxIiAhGtSCJi/UtKLmm2O7MzO39+n/d0TsxvvvtnzvN8nuc858znBYN8v+3MnDnn+TyfP8/nj1KCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCICSNjBJi58033+wdGhrKP378OIv/XSqV6vj32Wefrc/OztanpqYaY2Nj9QsXLtQzmUxDCWyIAGjSaDQyHIvxgw8+6KNF3tvp3/f39zfu3r1b37RpU23NmjU1+r/qn376aV0JWogAdAgW/HvvvYddOj88PJybm5tr3rt6vT5/7ty5Mv5EReTjjz/O3rt3b1AZEgrFc889N79+/fqaCETniAAsAZkmuZGRkXytVusJF/xC/Pnnn7VLly4VVUSOHj3aU61W+xUzpBnq09PTtdu3b1e//fbbqhIWRQSgjU4XfTv//PNP8auvvqqpCMD2f+aZZ/qURaAdisVilcys+ajX1w3kldA0bz788MPecNHTYlEa5Ojl3QLD78lmsz0kaD2Tk5NNzXD27NmyONP/0tUaALs9RV/6yAzJKUMGBwcrJ0+eLEd5jwsNsBgw22ZmZirdbiJ1pQaA7U3/wP7O0Utx8OTJE9zLSAIQJ+vWrcvRq7Br1646CW+ZHOeuFISuEgAs/Hw+3xfFtu+Unp4exPDxuYkyLf76668svQowj7pRELrCBIKpQ6HLgo2F38rGjRtno4Qg4zSBFgMRpG4ShFQLAKeN3wl0YluKYlP7KAAhgSCU0n6mkFUpBFGdt99+u58W14CrxZ82YBrhkA73EfdTpZTU/TCbdv5ynDlzZkZF8AF81gCtpNksSo0TjLSCBw8e9HNGdqJAB2Fa6RBJIHSUDxw4UPv6669LaTpDSIUJRIs//+jRo1jMHVr4DdI4c3TKWlEpB6HT48ePD+B+q5SQaPsYtumdO3f6aRHC0XVm8tD3VSuVyjy9KrTwy9euXdNyFLdt25br6+vTXky4DjJPqgMDA41yuexkMyuVSpmnT5/2TExMZG/cuJH41IrE+gAweWZnZwtQz8oy2OXpnxpFeaq02GFfsZgAuj5AcD2lttyezN69e3Mvvvhinu5Lnj7X+rOFb3DixIlikk2iRApAYPL023Z0scNyL/pWdAWgg3BrZufOnfk9e/bk//77b6vmCpLt6FlUkmoCJk4AohaQRAW768jIyPzDhw+rtrMndQQAC+7UqVMzEd6SpVBmr22tQAGIyuXLlxOTChKSKAFATBqZjcoCgVmBnWxeOYrm6AgAtBJdY0lFJ0taITc2NtZnSxCC4qA5lSAS4QTD2aUdZoD+ZVfnWPiBMzt38+ZNp06djhNMl1qn69SJ8zboHuK9FdpEGhTXx3ezCgL5Arnt27f3/PTTT4k5L/A+DIrFj9Abd4gTCx+xe1r4s4H92jX58eTToDhmZuPGjeVA87GBpMDJycmBpJwee32RiPQgvs/t7AZmBFR1rIvesQm0GE0fgdu0TEqEyFsNYGPxz8/P14PSRSwgqYj6lzrsdmSycmoDhKehuX3XBF6e6NlY/EHFVleZOlEIsj5n6N733rt3jyU/qUUIvNUE3mkA7Bg44OJa/OGuH5QryuJfBhKEypkzZ9i0QSgEylNz27soEEUpChROY7ku2MtffvlliT7Ty5x2x1GgKDToO+YnJibQ/Mv4WSB9gqJDeR+jQ15pgCCHn8UsCyI8Yuvr0wh8A5bDLUSH6Pl6l/rtjQDghJcjEgHVjVSBbsjOdAFMIi4HGc/39ddf90oIvBAA5PZwpDfA3kdcX7qh8QIHme5rkUMI1q9f3+tTOnXsAhBEfIzbA2Lxnz9/Hu0JxeSxQ1MIcJ+VIXjeeO7KA2K9CER8OMKdsvid0bzPpkIQdN8rKA8iQ7EKwDvvvNMniz9xNDiEAOFRH5zi2AQAxeumTm/SFz8dziW1JJVFCPD8kQ6iYiSWBwD7D50blAFJX/y4BwMDA0murWURguHh4d440yViEYA7d+70mpg+aVj8uqfdOFRS/gAhKJlEh3APDh48WFAx4fwkGKYPSbz27o+bTae7iVr82OHoZDVXKBTyb7zxRs/MzAwK+bU2n7Vr12auXr3q0xkHTo2rr7zySo9uYwKYguPj48p1PQZwuptwJLlFbT/oGiz2Xbt25Xfv3p1Fx2hUX1lI5y77dtCHNpToxKc0QannF198Mes6ac6pAJiWNPr44EE4Vebhw4c9LroxBIXoJd8mvph2urNQ67Aszkwg7P70A7UPvIKb403RNXZ6CuX1bdmypZ9Mm17yS9hLDBcDpgZ9Vw+ZDblt27bBBPHCHIQJg2uia9My7/A+en/N5e9xpgEOHz48GPTQj4xPTi8EmRZ+T9QZYjbxrHdnhjTBoK4m1B04qIsTDQDHl2w7bdOnWCzGntLc0oWuH7u9y050yxF2a9u3b1/P/v37G1euXIn1XpEAVOl6tOL7cIgPHTpUd/UbnIRBTWL+qOSK09bFwkem6vvvvz9oqyULF0FLczSxjbUUEclzJmnUFCLGenFy/da/xGQWbtymj6vJMraIu1mVidnrKuBhXQOY7P60m8VWxhgO2Ejq4gdIPZ6cnByMSxvQvdNukoUTYuVgg7b6BSa7f1xdxlw23XUFwqbkQ83FcX5i0soSbedPnz49ryxi9SGb7P60+J2r7vCgLk2LH0CLjY2NFeKoxkInDgig0mDlypXWE+WsPWjYz7rmQxzTVqCtbDTh8gmYRDEIQYPMGS1bHhsR1pGyiDUBGB0d1ZLeoKzRqtprJzTV0rz4QyAE8G+UQygqNK+bMEchXqsCa0UAYEro9qV37fia+Ck6QMBXrVpVbX9xlBp2CsK5joUAjQq0TFqMZbKpBazko+OkVGmAReDSUbO9+MkHqtHxfu3nn3+uffPNN7VOEr2wedAhUPall17K0fuztgZcBB0aGq7CpGjIq9uaHXlW9I+VsyArNxdpAkqDYPd3QuDw9nFPlFxsqgwt/o7eH7QobN0Imn396dXD3SE78AmUKyHYunVrRaftYrCerLS1ZFctUFdEZPsfkQJXyW42eo8Gg/Oa0yLRh1/x0ezrjx300KFD1SdPnrB0awuhHTnnKvUA36FTN4C/Hx8fr9pIkmPXAIODg1q7f7FYtDKHayE4e49i4at/J8tYT9cItAPORiofffRRH5d5hDYldFjmIhe/GRHS0QKBM8yeJMeuAXbv3t2vkyh29uxZJ3ngOJh5+vSp8cJBVAMZmOfPny/HkI7c+OGHH6pck17wvC5evIjendajb9ACO3bsiGwhBJVw7NfHKgC65g92UTRjVZaB6TM9PW1cfxoWbpBZEmtBSjDyqErmQVY3Bz+EnlvGVVniyy+/nKeT/kjXCyGlaFnt9u3brKYaaxhU1/whFewk7g+7XxkSZKf61HQX5yYljia2qOZy0bHt8ePHWteKyJhihvXH6rb5oIiH9V0Hpo+p3Y8T6mDOgHegiW1wgm4EaTXr5wMksHWd9Ajd6OJSsAkAdg6dBRY4kVZ30yDBzSivxNd65FZwfUggUwbg4MlB89oGmVyRtT7WF/ehGJsAkD2qdWEuzB/0IVIGJGHxhyB70lQTBAUpVsEgcqWHnwJAtrGX5g92/zR2olgKXK+JT4AkNNtaQNcMonAo63WxCUC5XI4smS7MH5PdP0jMS+SgDfgESMVQmjjQAg2K7ESO6Dz//POsfivLh+na/0NDQ1bzfkx2/5ZyzMRC5lBJNxffRSoy8qRURLDOOCNVLB+E5C2lAYXDrB6/6/olIM5yTEaalWBKE9upyEj2UxqYPNd2WARANz5rO31AtyINpkNaxizhd+iaQjZTkU1S5k0P/Vph+SCy5XXDn9bQNcsATAeVIuj3mBSnF7gdYgiVyaHkrVu32ISS5Yf19vbWyKGJZGuPjIxYNX90axJQjK/SN22mjt+l4w9hE0GvocnJyfqvv/5qfF8KhUI2aBisdOF0hFkEgHaY6uHDh+tResCgWFpZBJ2Z6XpUVCj64bQc0xX4XbTwtMPBcIrJJFI+AKFEqxeO7FUuSWoOSsAu00ntp+2id5g/Og2ZgrCnVx2XucDvMgmL+sZrr73GYgZx2nb1lj4+OLLOTk1NZcfGxmCH50ZHR5HRV8cJoO1FphslcFmRFhPQbs6Hothg8+bNGXLwlSm2TvsawSKvXbt2TbkGUQKdUkcXSXlxAlP1yJEjKg1wRYJS1QAqROdUGm25VfpHrTbSZAZxkEoB0Cke37RpU1csjPXr16fifINMadEAC6F7TI7WJaoLiGMQnQ36+/tFABaCHrDW4derr74a61AJVyALUwn/kToBQORJaRB0XOgGGroJcj6hO3egnSRPKl8Qnbwkl20J2wnHqgbhYjSPqn/yySc1my1KgjTkRIdDg6CFManSALD/deqS6WQxFgEIRy9NTExgGAfaBvYh7eDdd99dEXRxttWsN/Gn3YVCgcWZT40AhIMtktLhmQ4KC6hTXux60bbw8OHDSBhj/z04D9Dt1uwDyDjgKlRiu7nI8BsaGso+fvzY+QLEZEHs/AbzCJwOaI4yNcXinDQUvCTRBK5xZhKwLFaTMTg+4FIAoKnIzBmM8h6f5iSnDWNHCC3G6eTV+egdTiqVSrPDmnIAGtuSpoyUlYmubdu3b0frwlQcYvmEsQ9QKpUSu/OHcB2qdMLw8LDWdyHsZ8sn6GaMbUDY3Tp59z6hM7QhDkIhsGUOIST71ltvQUCbloGLkGzcpDIXKCphgYVyAB3UGS0mW5qAHOJehGQxG7k9JItxSnFOnreJsQCQPZuKE1SuAovlCCbHGMEtBAhiYMEvFkVDKeXx48cH0igExgJAIchUqEcbnYcXAT39jWPYXEKAIEYnETyURKZRCIwFgOL+qRAAzk4Dy4F6aI70Cw4hiNI6Jo1CYCwAtHukwgRCDxzlLsKCGupi3EKgM8w8bUJgLACmTp1PkDng8mQ0diHQzZxNkxAYC8CBAwdSU0jyxx9/uI7neqEJdEiLEEgYtAXbU8kXITYhGBsbM/rONAgBy4UfO3ZsBcP4ocbo6KixNrl//37O5GALeeaXLl2Koyt0BouXo9AjQu5Qhp7doOmzW7NmTf3EiRPFJB6YsQgA2c4DulPMg7TcEmeGH6aq0+7WpysIdE3FmBpkORcCHIDhDEAZklQhYDGBdPq8t1DiXmyYqk7H+Nq7uO224Evg3BwK5ooZ3/+kmkMsAvD9999rPbAgDdnKTosaX90DJ/gCe/fujStX3rkQoBs2x/clUQhYBEA3EmS7Q7TBIDYkgsWZ/+JaCNi+L2lCwCIA2G11Og3YPn01aQgLx/DgwYPGU+UNECFwAFsYVMcPCPq8W71JulPJAUyhoDg9LkQILMMmALOzs5HNDeyyZGt7qwUAitMRKVHxIUJgETYBoIWitchcZGGaaAGAMKGD6elLIUJgCTYB0PUDarUa0g+s3hxogWD0kTYoDhFNoIfPQsCaCpHL5SIvMhdmEDh37lzZtCUgNIH4BHr4KgSsAqAbdlyxYoWLnbXx6NEj40KUwCcoSIg0Oj4KAfeFaOeWbNy4cdZFg1qTtI1WcPRPB21luua4WpW4Tptg+z6f0ia4s0EbxWJRa0HcvHnTiZOJU0+OtoDYzeAXxFgwLpqAAfZ0aN0xo8PDwzCDXNyQhkmeUDsoGI+xc4IIgSFWvlw3PRrjU7mani4HVxZkO0in3rlzZ8VxPx0xhzSxIgAUM+8l8yDy4kKU5tSpU7PKUQ9M3evsFAhD0Ma7duHChbrlhyxCoIEt9ZM5cuTICqWBSy0AbAtBKxDwu3fv1jGQ7/PPP69YeOAiBBGxVRKpPY7ToS/QhKI4FYpAORmQDbMQ+UXowwP7V/H/TvEJImKtJlg3/QCLhOxzp8XpLoUgBA+8ky4UaKeOCje8OqxXFiGIgNUv0o25u/YFQmw5xouxlLmH3CM6uOtvDybAVPjll1+qly9fXk5gxRzqAKtdIVCaqDTAQ6ewovOUAyxGHMjFPT4IvTpxxrBQJA27ZHgarRztzGnWBFZzcB48eFAfHx/v7evri/xDMEiC3lujAzKni/HKlSsNDMug787SdVvdICqVSq19cHWnA0dwbZ0MzcB/x99hyIYyoNMhHVzfVyqVMhcvXsT3WR3oZ70v0NTUlLZt/cILL/SreAZC1DEyCSaK65m6UXp1ut6Z4/g+22no1rMwTbQAdoGRkRH1+++/x9J9Drvz1atXqxMTExloJMVMuwaAk0tESgx0vTO7/j569tnffvvNmhZw0hnORAsE9m6cQ53r586dm0OvIAe+gdbvTLMmCMpmreFEAOAMm5QlxmgK/QeKaug18+OPP86tWrXKu2F1aRUC23OfnfUGNSlLRFQgjqjQQkCYP/vssxKiRaZVZu04Gp+UKCFAOomyiDPTAtEcsqWzurZ0EBVS7VGTuEC06MaNG9Xr168jYtSj4+O0+wDkLzV27NhhVByUNp+gUCjUcJ+VJZx2hzYtS8QhVcz+wEJgZ+Mast1AtzxlSJo0AdaMsojr9ujGZYnDw8MF3+pK4R9wOcj0WXMcn5UGISC/cU5ZzgZwPh/AtBkrnCIfi6sZp2U26B4VUy4Es0v1bcVvx+I/ffq01UMwENciyh47dmzAxMOP0APfCTp5T8ukfmfJ3BvgGOLtOpcnwrNBcKOXNo/M9PR0ltYDhBDRtnnl6LnGtotyJJ75JAQWBAB0gxDESmwjkvDgTR0+13OxYqCecnModmKdEcbh8IkQdI4Iwf8S95C8psNnmnAW3ui0TTFvQYTAEj5MiayT7Wwc68WNTtsU8zZECCzgxZhUhLs4ShLDQgqUEap0IkLAjDenqleuXKmNj4/nTItQkEL99OnT3pGRkYzLNGrU7Nbr9UjXvlBBTAeEBTta6Ret+Jo24RKvdko4xRy7DUAaNbq1qXQ6x6IJmPDNVGjeaK60ArQtnJycTKtfIELAgI+2MlsqAIBfgN6dMff1t4UIgSG+Oot1TiEAMIlIGwymUBuIEBjgc7SEXQhCbRBjS3NbiBBo4ltufTtsEY9WUFzz3Xff5Tds2JDhKrBxGAVaDIkOaZCEeDl2t1mu6FAItAGS8WAWxTwBkhPRBBHxXQP8BxokcZwTtBOcG/Ts27evZ//+/Q06j9B6mB5ogBDRBBFI1IkpmlXZamIbjjyCRtDxESBIyh9EE3RIIh1B1BKgjbrtlhlI1966dev8coPwUKdM5tSAiv75tmchSD3BMiTGBGol7NjG7Ry3A3MrNI82b96cW716tbp9+/b/2+WCvCMUwxh3hbAAqznUSZe+pJlDSQ8FNrtI48RXOQKp248ePcIiqA0NDeVNRq46nIbDpgnQIQ9NAJb5s8RogqRnTTaCtoXOmtjC7KKFlEcEiWPesCPYfALSAp1EzBLjE6QibRi76KlTp4om3Sa6ABYhuHXrVqdCnwghSFPefP306dN4wOW4B1x4jLEQoINDhD/3XghSVzgCbYCHzN23M0UYCUHQuiQKXgtBaiunHLY0TyLaQkAaQCcq460QJDIM2iloyEuvCkWJGoODgzmbIVMdHIRBlyJyiBQCQwtZ+yCSM0S6YcOGHMfgjFQLQAim1PgoCDELAIgkBHTvyteuXTO6Xi4hoGvJrlq1qt5+LhOVrhCAEN8EwQMBAMsKAXZ+LH6uXp1cQkAmlfH4pK4SgJBWQdiyZYsql8ux+EKeCABotN6P6enpDIQBNvvKlSvnz549O2e687fDIQRr167NXL161eggMY21sjo0m7TOzs7mOU5LO8XhSbCvGJ8Ynzlz5h9lQFdqgAVoTnvBLgi7kg7UMrZnBAOPNEBsmGgCnP6bagARgDbgVMEmvn79+jyZBPV169Y1ZmZmsjb8BRGAf9EVArp/VdPxSSIASwBfIdQMmFpPNxwCweYz0OdVEKpVgpYQkG9iPJpKfABNUAMwNTWVHRsbyyM9IGpiHCaknDx50ur8qwTSsU/A5T+JADCC2gDa0TMQjN27d2cfPnyYHR0dVeRcZ1AxhgeLyMrc3Nx8lzu/S5E5evRoYakNhTN4IAIgeAlqrPfs2ZO/f/8+qu2aIdnVq1dXaVOpdlCPIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAhCivk//xr5a8LQ+uMAAAAASUVORK5CYII="></img>'
)

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const screenshotStatus = ref<boolean>(false)
// 销毁组件函数
const destroyComponent = function (status: boolean) {
  screenshotStatus.value = status
}
// 获取裁剪区域图片信息
const getImg = function (base64: string) {
  console.log('截图组件传递的图片信息', base64)
  valueHtml.value = valueHtml.value + `<img src='${base64}' />`
}

const route = useRoute()
// const usePlan = usePlanStore()

onMounted(() => {
  console.log(route.params)
})

// const planCount = computed(() => Number(usePlan.$state.planType))

const addDialog = inject(ADD_DIALOG)

const show = () => {
  addDialog?.({
    title: '新增监测方案',
    width: '500px',
    component: shallowRef(AddPlan)
  })
}

// const detailListRef = ref<(Element | ComponentPublicInstance | null)[]>()
// const save = async (data: string[], i: number) => {
//   const planData = usePlan.$state
//   if (!planData.filters) {
//     planData.filters = []
//   }
//   if (!planData.filters[i - 1]) {
//     planData.filters[i - 1] = {
//       groupList: [],
//       keyWordsList: []
//     }
//   }
//   planData.filters[i - 1].keyWordsList = data.map((v) => {
//     return {
//       groupId: '',
//       id: v
//     }
//   })
//   const res = await updatePlan(usePlan.$state.id, planData)
//   if (res.code === SUCCESS_CODE) {
//     mitts.emit('updatePlanList')
//     usePlan.setPlan(planData)
//     ElMessage.success('保存成功')
//   } else {
//     ElMessage.warning(res.message)
//   }
// }
</script>

<style scoped lang="less">
.layout {
  flex: 1;
  display: flex;
  height: calc(100vh - 64px);
  overflow-y: hidden;
  overflow-x: auto;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .img {
    width: 800px;
    height: 600px;
    background: url(../../assets/img/kong.png) no-repeat center;
  }

  div {
    font-weight: normal !important;
  }
  a {
    color: @primary;
    display: inline-block;
  }
}
</style>
