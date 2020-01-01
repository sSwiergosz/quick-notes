<template name="modal">
  <form @submit.prevent="addNote" action="" novalidate="true">
    <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <h2 class="modal-header__title">News</h2>
            </div>

            <div class="modal-body">
              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </p>
              <input type="text" name="title" placeholder="Add title"
                class="modal-body__title" v-model="noteTitle">
              <textarea type="text" name="note" placeholder="Add note (max 150 characters)"
                maxlength="150" class="modal-body__note" v-model="noteContent"></textarea>
            </div>

            <div class="modal-footer">
              <button class="modal__btn modal__btn--save" title="Add note" type="submit">
                Save
              </button>
              <button class="modal__btn modal__btn--cancel" title="Cancel adding"
                @click="$emit('close')">
                Cancel
              </button>
            </div>
          </div>
        </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Modal',
  data: () => ({
    errors: [],
    noteContent: undefined,
    noteTitle: undefined,
  }),
  methods: {
    addNote(e) {
      this.errors = [];

      if (this.noteContent && this.noteTitle) {
        this.$emit('save', this.noteTitle, this.noteContent);
        this.$emit('close');
      }
      if (!this.noteTitle) {
        this.errors.push('Title not provided!');
      }
      if (!this.noteContent) {
        this.errors.push('Note content not provided!');
      }
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-body {
  margin: 20px 0;
  height: calc(60% - 40px);
  &__title, &__note {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    border: solid 1px #afaeb2;
    border-radius: 3px;
    font-family: 'Ubuntu', sans-serif;
  }
  &__note {
    resize: none;
    height: 60%;
  }
}
.modal__btn {
  border: none;
  height: 30px;
  width: 100px;

  &--save {
    margin-right: 20px;
    padding: 0;
    background-color: #006699;
    text-align: center;
    color: #ffffff;
    border-radius: 3px;
  }
  &--cancel {
    background-color: #ffffff;
    color: #006699;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
}
.modal-header, .modal-footer {
  height: 20%;
  &__title {
    margin: 0;
    font-weight: 350;
  }
}

.modal-footer {
  display: flex;
  align-items: center;
}
</style>
