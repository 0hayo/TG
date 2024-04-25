// ==========tinymce.js==========
// Any plugins you want to setting has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
// colorpicker/contextmenu/textcolor plugin is now built in to the core editor, please remove it from your editor configuration

export const plugins = [
  'advlist anchor autolink autosave code codesample  directionality  fullscreen hr insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus  template  textpattern visualblocks visualchars wordcount'
]

export const toolbar = [
  'fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
  'hr bullist numlist link  preview anchor pagebreak insertdatetime media  forecolor backcolor fullscreen'
]

// ==== isNumber  函数====
const toString = Object.prototype.toString
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}
export function isNumber(val) {
  return is(val, 'Number')
}

// ==== buildShortUUID  函数====
export function buildShortUUID(prefix = '') {
  const time = Date.now()
  const random = Math.floor(Math.random() * 1000000000)
  // eslint-disable-next-line no-undef
  unique++
  // eslint-disable-next-line no-undef
  return prefix + '_' + random + unique + String(time)
}

// ==== onMountedOrActivated  hook====
import { nextTick, onMounted, onActivated } from 'vue'
export function onMountedOrActivated(hook) {
  let mounted
  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
