<template>
  <el-dialog
    title="添加任务接收人"
    :visible.sync="visible"
    width="750px"
    @close="onClose"
  >
    <div style="text-align: center">
      <tree-transfer
        ref="treeTransfer"
        :title="title"
        :from_data="userList"
        :to_data="toData"
        :default-props="{label:'label', children: 'children'}"
        :mode="mode"
        height="480px"
        filter
        placeholder="搜索关键字"
        @add-btn="add"
        @remove-btn="remove"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <dialog-footer @cancel="onClose" @ok="onOKClick" />
    </span>
  </el-dialog>
</template>

<script>
import DialogSelector from '@/views/components/mixins/DialogSelector'
import { loadContactAPI } from '@/views/task/mytask/dialogs/ContactDialog/ContactDialogAPI'
import DialogFooter from '@/components/DialogFooter'
import treeTransfer from 'el-tree-transfer'

export default {
  name: 'ContactDialog',
  components: { DialogFooter, treeTransfer },
  mixins: [DialogSelector],
  props: { removeKey: { type: Number, default: 0 }},
  data() {
    return {
      userList: [],
      fromData: [],
      newSelection: this.convertSelection(),
      toData: [],
      title: ['可选接收人', '已选接收人'], // 标题 类型：Array 必填：false 默认：["源列表", "目标列表"]
      mode: 'transfer', // transfer addressList
      selectionList: []
    }
  },
  watch: {
    removeKey() {
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    convertSelection() {
      const newSelection = []
      this.selection.forEach(e => {
        newSelection.push({ key: e.key })
      })
      return newSelection
    },
    loadUsers() {
      loadContactAPI().then(res => {
        if (res['code'] === 200) {
          this.userList = res['data']
          this.userList.forEach(item => {
            item.pid = 0
            if (item.userList) {
              if (!item.children) {
                item.children = []
              }
              item.userList.forEach(user => {
                item.children.push({
                  id: '0' + user.userId,
                  label: user.nickName,
                  pid: user.deptId
                })
              })
            }
            if (item.children) {
              item.children.forEach(e => {
                if (!e.pid) {
                  e.pid = e.parentId
                }
                if (e.userList) {
                  e.userList.forEach(user => {
                    if (!e.children) {
                      e.children = []
                    }
                    e.children.push({
                      id: '0' + user.userId,
                      label: user.nickName,
                      pid: user.deptId
                    })
                  })
                  e.children.forEach(val => {
                    if (!val.pid) {
                      val.pid = val.parentId
                    }
                    if (val.userList) {
                      val.userList.forEach(user => {
                        if (!val.children) {
                          val.children = []
                        }
                        val.children.push({
                          id: '0' + user.userId,
                          label: user.nickName,
                          pid: user.deptId
                        })
                      })
                    }
                  })
                }
              })
            }
          })
        }
        console.log(this.userList)
      })
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode === 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      this.selectionList = toData
      obj.nodes.forEach(item => {
        if (!item.children && !item.userList) {
          this.newSelection.push({
            key: parseInt(item.id),
            label: item.nickName
          })
        }
      })
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      this.selectionList = fromData
      obj.nodes.forEach(item => {
        if (!item.children && !item.userList) {
          this.newSelection.forEach((e, i) => {
            if (item.id === ('0' + e.key)) {
              this.newSelection.splice(i, 1)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.commenter-transfer{
  text-align: left;
  display: inline-block;
}
 ::v-deep .el-transfer-panel__header{
  background-color: #F1F0FD;
}
 ::v-deep .el-transfer__buttons .el-button--primary.is-disabled{
   background-color: #B9B3F7;
   border: none;
 }
 ::v-deep .transfer-main {
  display: flex;
  flex-direction: column;
 }
 ::v-deep .wl-transfer .transfer-title {
  margin: 0;
  background-color: #F1F0FD;
  text-align: left;
  color: var(--primary-color-0);
 }
 ::v-deep .el-tree-node__content {
  color: var(--primary-title-color)
 }
 ::v-deep .el-button {
  width: 48px;
  height: 32px;
  border-radius: 0;
  padding: 5px;
  border: none;
 }
 ::v-deep .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus {
  background-color: #B9B3F7;
  border-radius: 2px;
 }
::v-deep .el-tree__empty-text {
  color: var(--primary-placeholder-color);
}
::v-deep .wl-transfer .transfer-center .transfer-center-item .el-button{
  background-color: #7467F0;
  border-radius: 2px;
}
::v-deep .wl-transfer .transfer-center .transfer-center-item .el-button.is-disabled{
  background-color: #B9B3F7;
  border-radius: 2px;
}
::v-deep .wl-transfer .transfer-main {
  padding: 0;
}
::v-deep .wl-transfer .el-input__inner {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid var(--primary-border-color);
}
::v-deep .wl-transfer .transfer-right .el-input {
  display: none;
}
</style>
