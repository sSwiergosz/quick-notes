<template>
  <div class="container">
    <section class="statistics">
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Total
        </div>
        <div class="statistics__counter--content">
          18
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Completed
        </div>
        <div class="statistics__counter--content">
          12
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Not completed
        </div>
        <div class="statistics__counter--content">
          6
        </div>
      </div>
    </section>
    <section class="notes">
      <div>
        <vue-good-table
          class="notes__table"
          :columns="columns"
          :rows="rows"
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
    rows: [
      {
        id: 1,
        title: 'delectus aut autem',
        content: 'Lorem ipsum',
        status: 'New',
      },
      {
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        content: 'Lorem ipsum',
        status: 'Completed',
      },
      {
        id: 3,
        title: 'fugiat veniam minus',
        content: 'Lorem ipsum',
        status: 'Not completed',
      },
    ],
    showModal: false,
  }),
  methods: {
    addNote(title, content) {
      this.rows.push({
        id: this.rows.length + 1,
        title,
        content,
        status: 'New',
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
      width: 100px;
      height: 30px;
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
