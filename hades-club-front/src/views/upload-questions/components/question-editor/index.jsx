import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

// 当前菜单排序和分组

function MyEditor(props, ref) {
  // editor 实例
  const [editor, setEditor] = useState(null)

  // 编辑器内容
  const [html, setHtml] = useState('<p></p>')

  // 工具栏配置
  const toolbarConfig = {
    excludeKeys: ['group-image', 'group-video']
  }

  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...'
  }

  const changeValue = html => {
    setHtml(html)
    props.onChange(html)
  }

  const onClear = () => setHtml('')

  /**
   * 回现代码
   */
  const onCashBack = () => {
    let { cashBackText } = props
    if (!!!cashBackText) {
      return
    }
    setHtml(`${cashBackText}`)
    // editor.fo;
  }

  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(ref, () => ({
    // onCallback 就是暴露给父组件的方法
    onClear,
    onCashBack
  }))

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => changeValue(editor.getHtml())}
          mode='default'
          style={{ height: '300px', overflowY: 'scroll' }}
        />
      </div>
    </>
  )
}

export default forwardRef(MyEditor)
