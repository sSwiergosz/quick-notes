<template>
  <div class="container">
    <section class="statistics">
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Total
        </div>
        <div class="statistics__counter--content">
          {{notes.length}}
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          New
        </div>
        <div class="statistics__counter--content">
          {{notes.filter(el => el.status === 'New').length}}
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Completed
        </div>
        <div class="statistics__counter--content">
          {{notes.filter(el => el.status === 'Completed').length}}
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Not completed
        </div>
        <div class="statistics__counter--content">
          {{notes.filter(el => el.status === 'Not completed').length}}
        </div>
      </div>
    </section>
    <section class="notes">
      <div>
        <vue-good-table
          class="notes__table"
          ref="notes-table"
          @on-selected-rows-change="selectionChanged"
          :columns="columns"
          :rows="notes"
          :select-options="{
            enabled: true,
            disableSelectInfo: true,
          }"
          styleClass="vgt-table"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'id'">
              <span style="color: #4791B5;">{{props.row.id}}</span>
            </span>
            <span v-else>
              {{props.formattedRow[props.column.field]}}
            </span>
          </template>
        </vue-good-table>
        <button
          class="notes__btn-add"
          title="Add quick note"
          @click="showModal = true"
        >Add</button>
      </div>
    </section>

    <Modal
      v-if="showModal"
      @close="showModal = false"
      @save="addNote"
    />
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import Modal from './Modal.vue';

export default {
  name: 'Dashboard',
  components: {
    Modal,
    VueGoodTable,
  },
  data: () => ({
    columns: [
      {
        label: 'ID',
        field: 'id',
        type: 'number',
        thClass: 'vgt-left-align',
        tdClass: 'vgt-left-align',
      },
      {
        label: 'Title',
        field: 'title',
      },
      {
        label: 'Content',
        field: 'content',
      },
      {
        label: 'Status',
        field: 'status',
      },
    ],
    deleteMsg: 'Do you want to delete this news?',
    showModal: false,
  }),
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    addNote(title, content) {
      const newId = this.notes[this.notes.length - 1].id + 1;
      this.$store.commit('addNote', {
        id: newId,
        title,
        content,
        status: 'New', // TODO - what to do with status?
      });
    },
    selectionChanged(rowObj) {
      if (!rowObj.selectedRows[0]) return;
      const rowId = rowObj.selectedRows[0].id; // we delete one news at time
      this.$toasted.show(this.deleteMsg, {
        icon: 'exclamation-triangle',
        position: 'bottom-center',
        action: [
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.$refs['notes-table'].unselectAllInternal(); // deselect after canceling
            },
          },
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              this.$store.commit('removeNote', rowId);
              toastObject.goAway(0);
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
$background-primary: #ffffff;
$box-shadow-primary: 0 1px 3px rgba(0,0,0,0.12);

@mixin arrow ($border-color, $transform-deg) {
  border: solid $border-color;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate($transform-deg);
}

.container {
  height: 100%;
  & .notes {
    padding-top: 20px;
    & .notes__table .vgt-table {
      & .vgt-checkbox-col {
        border-right: none;
      }
      & tbody .vgt-checkbox-col {
        background: #ffffff;
        border-bottom: 1px solid #dcdfe6;
      }
      & th {
        background: #989898;
        color: #ffffff;
        font-weight: 300;

        &.sortable:after {
          @include arrow($border-color:#afaeb2, $transform-deg:-135deg);
        }
        &.sorting-asc:after {
          @include arrow($border-color:#f4f4f4, $transform-deg:-135deg);
        }
        &.sortable:before {
          @include arrow($border-color:#afaeb2, $transform-deg:45deg);
        }
        &.sorting-desc:before {
          @include arrow($border-color:#f4f4f4, $transform-deg:45deg);
        }
      }
    }
    & .notes__btn-add {
      float: right;
      margin-top: 20px;
      border: none;
      width: 140px;
      height: 35px;
      padding: 0;
      background-color: #006699;
      text-align: center;
      color: #ffffff;

      &:hover {
        cursor: pointer;
      }
    }
    & .notes__btn-add:focus {
      outline: none;
    }
  }

  & .statistics {
    display: flex;
    align-items: center;
    box-shadow: $box-shadow-primary;
    width: 50%;
    height: 15%;
    padding: 20px;
    background-color: $background-primary;
    &__counter {
      width: 33%;
      text-align: left;

      &--header {
        color: #a2a2a2;
        font-size: 20px;
      }
      &--content {
        font-size: 42px;
        font-weight: 300;
      }
    }
  }
}

</style>
