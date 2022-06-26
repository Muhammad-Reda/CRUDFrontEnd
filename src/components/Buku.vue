<template>
    <div>
        <h1 class="text-center">CRUD</h1>
    </div>

    <div class="container">
        <!-- Show Add / delete asll Book Button -->
        <div class="col-lg-12">
            <button
                class="float-end btn btn-info"
                @click="addModalDialog(true)"
            >
                <FIcons :icon="['fas', 'plus']" /> Tambah buku
            </button>
            <button
                class="float-start btn btn-danger"
                v-if="bookData.length > 0"
                @click="deleteAllModalDialog(true)"
            >
                <FIcons :icon="['fas', 'trash']" />Hapus semua buku
            </button>

            <div class="clearfix"></div>
        </div>
        <hr class="bg-info" />

        <!-- Show Error Message-->
        <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
            v-if="errMsg"
        >
            {{ errMsg }}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="close"
            ></button>
        </div>

        <!-- Show Success Message-->
        <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
            v-if="successMsg"
        >
            {{ successMsg }}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="close"
            ></button>
        </div>

        <!-- Show  Books Details : Tables -->
        <table class="table table-border table-striped caption-top">
            <caption>
                Banyak buku ({{
                    bookData.length
                }})
            </caption>
            <thead>
                <tr class="bg-success text-light text-center">
                    <th>isbn</th>
                    <th>judul</th>
                    <th>pengarang</th>
                    <th>abstrak</th>
                    <th>tanggal_terbit</th>
                    <th>penerbit</th>
                    <th><FIcons :icon="['fas', 'cog']" />Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(books, i) in bookData" :key="i">
                    <td>{{ books.isbn }}</td>
                    <td>{{ books.judul }}</td>
                    <td>{{ books.pengarang }}</td>
                    <td>{{ books.abstrak }}</td>
                    <td>{{ books.tanggal_terbit }}</td>
                    <td>{{ books.penerbit }}</td>
                    <td>
                        <button
                            class="btn btn-danger"
                            @click="
                                deleteModalDialog(true);
                                selectBook(books);
                            "
                        >
                            <FIcons :icon="['fas', 'minus']" />Delete
                        </button>
                        <button
                            class="btn btn-warning"
                            @click="
                                updateModalDialog(true);
                                selectBook(books);
                            "
                        >
                            <FIcons :icon="['fas', 'edit']" />Update
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Show  Add New book Modal -->
        <div id="overlay" v-if="showAddModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-info">Tambah buku</h5>
                        <button
                            arial-hidden="true"
                            @click="addModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error': v$.newBook.isbn.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="bookisbnFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newBook.isbn"
                                />
                                <label for="bookisbnFloat"> isbn </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newBook.isbn.$error"
                                    >{{
                                        v$.newBook.isbn.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error': v$.newBook.judul.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="bookjudulFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newBook.judul"
                                />
                                <label for="bookjudulFloat"> judul </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newBook.judul.$error"
                                    >{{
                                        v$.newBook.judul.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newBook.pengarang.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNameFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newBook.pengarang"
                                />
                                <label for="studentNameFloat">
                                    pengarang
                                </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newBook.pengarang.$error"
                                    >{{
                                        v$.newBook.pengarang.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newBook.abstrak.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentTLFloat"
                                    placeholder="2002-10-20"
                                    v-model.trim="newBook.abstrak"
                                />
                                <label for="studentTLFloat"> Abstrak </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newBook.abstrak.$error"
                                    >{{
                                        v$.newBook.abstrak.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newBook.tanggal_terbit.$error,
                                }"
                            >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="studenttanggal_terbitFloat"
                                    placeholder="Islam"
                                    v-model.trim="newBook.tanggal_terbit"
                                />
                                <label for="studenttanggal_terbitFloat">
                                    tanggal_terbit</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="v$.newBook.tanggal_terbit.$error"
                                    >{{
                                        v$.newBook.tanggal_terbit.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.newBook.penerbit.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentpenerbitFloat"
                                    placeholder="Pekanbaru"
                                    v-model.trim="newBook.penerbit"
                                />
                                <label for="studentpenerbitFloat">
                                    penerbit</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="v$.newBook.penerbit.$error"
                                    >{{
                                        v$.newBook.penerbit.$errors[0].$message
                                    }}</span
                                >
                            </div>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-info"
                                    @click="addNewBook()"
                                >
                                    Tambah data buku</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Edit book Modal -->
        <div id="overlay" v-if="showUpdateModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-warning">Update buku</h5>
                        <button
                            arial-hidden="true"
                            @click="updateModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentBook.isbn.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="bookisbnFloat"
                                    placeholder="123"
                                    v-model.trim="currentBook.isbn"
                                />
                                <label for="bookisbnFloat"> isbn </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentBook.isbn.$error"
                                    >{{
                                        v$.currentBook.isbn.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentBook.judul.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentjudulFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentBook.judul"
                                />
                                <label for="studentjudulFloat"> judul </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentBook.judul.$error"
                                    >{{
                                        v$.currentBook.judul.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentBook.pengarang.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNameFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentBook.pengarang"
                                />
                                <label for="studentNameFloat">pengarang</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentBook.pengarang.$error"
                                    >{{
                                        v$.currentBook.pengarang.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentBook.abstrak.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentTLFloat"
                                    placeholder="2002-10-20"
                                    v-model.trim="currentBook.abstrak"
                                />
                                <label for="studentTLFloat"> abstrak </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentBook.abstrak.$error"
                                    >{{
                                        v$.currentBook.abstrak.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentBook.tanggal_terbit.$error,
                                }"
                            >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="studenttanggal_terbitFloat"
                                    placeholder="Islam"
                                    v-model.trim="currentBook.tanggal_terbit"
                                />
                                <label for="studenttanggal_terbitFloat">
                                    tanggal_terbit</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentBook.tanggal_terbit.$error"
                                    >{{
                                        v$.currentBook.tanggal_terbit.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentBook.penerbit.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentpenerbitFloat"
                                    placeholder="Pekanbaru"
                                    v-model.trim="currentBook.penerbit"
                                />
                                <label for="studentpenerbitFloat">
                                    penerbit</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentBook.penerbit.$error"
                                    >{{
                                        v$.currentBook.penerbit.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-warning"
                                    @click="updateBook()"
                                >
                                    Update data buku</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Delete book Modal -->
        <div id="overlay" v-if="showDeleteModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">Hapus data buku</h5>
                        <button
                            arial-hidden="true"
                            @click="deleteModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <h6 class="text-danger">
                                Apakah kamu yakin menghapus data buku ini?
                            </h6>

                            <p>
                                <span>ISBN : {{ currentBook.isbn }}</span
                                ><br />
                                <span>Judul buku : {{ currentBook.judul }}</span
                                ><br />
                                <span
                                    >Pengarang :
                                    {{ currentBook.pengarang }}</span
                                ><br />
                                <span>Abstrak : {{ currentBook.abstrak }}</span
                                ><br />
                                <span
                                    >Tanggal terbit :
                                    {{ currentBook.tanggal_terbit }}</span
                                ><br />
                                <span
                                    >Penerbit : {{ currentBook.penerbit }}</span
                                ><br />
                            </p>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-danger"
                                    @click="deleteBook()"
                                >
                                    Hapus data buku</buttn
                                >
                                <buttn
                                    class="btn btn-success"
                                    @click="deleteModalDialog(false)"
                                >
                                    Tidak, jangan hapus</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Delete All book Modal -->
        <div id="overlay" v-if="showDeleteAllModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">
                            Hapus semua siswa
                        </h5>
                        <button
                            arial-hidden="true"
                            @click="deleteAllModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <h6 class="text-danger">
                                Apakah kamu yakin menghapus semua data siswa?
                            </h6>

                            <p>Seluruh data buku akan hilang permanen</p>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-danger"
                                    @click="deleteAllBooks()"
                                >
                                    Hapus seluruh data</buttn
                                >
                                <buttn
                                    class="btn btn-success"
                                    @click="deleteAllModalDialog(false)"
                                >
                                    Tidak, jangan hapus</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import useValidate from "@vuelidate/core";
    import { required, minLength, maxLength } from "@vuelidate/validators";
    export default {
        name: "Buku",
        data() {
            return {
                v$: useValidate(),
                errMsg: "",
                successMsg: "",
                isDBConnected: "",
                isDBConnectedMsg: "",
                bookData: [],
                showAddModal: false,
                showUpdateModal: false,
                showDeleteModal: false,
                showDeleteAllModal: false,
                newBook: {
                    isbn: "",
                    judul: "",
                    pengarang: "",
                    abstrak: "",
                    tanggal_terbit: "",
                    penerbit: "",
                },
                currentBook: {},
            };
        },

        validations() {
            return {
                newBook: {
                    isbn: {
                        required,
                        minLength: minLength(5),
                        maxLength: maxLength(20),
                    },
                    judul: {
                        required,
                        minLength: minLength(5),
                        maxLength: maxLength(255),
                    },
                    pengarang: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(255),
                    },
                    abstrak: { required, minLength: minLength(5) },
                    tanggal_terbit: {
                        required,
                        minLength: minLength(4),
                    },
                    penerbit: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(255),
                    },
                },
                currentBook: {
                    isbn: { required, minLength: minLength(5) },
                    judul: { required, minLength: minLength(5) },
                    pengarang: { required, minLength: minLength(3) },
                    abstrak: { required, minLength: minLength(8) },
                    tanggal_terbit: { required, minLength: minLength(3) },
                    penerbit: { required, minLength: minLength(3) },
                },
            };
        },

        mounted() {
            this.getBookData();
        },

        methods: {
            addModalDialog(val) {
                this.showAddModal = val;
            },
            updateModalDialog(val) {
                this.showUpdateModal = val;
            },
            deleteModalDialog(val) {
                this.showDeleteModal = val;
            },
            deleteAllModalDialog(val) {
                this.showDeleteAllModal = val;
            },

            toFormData(obj) {
                var fd = new FormData();
                for (var i in obj) {
                    fd.append(i, obj[i]);
                }
                return fd;
            },

            clearOldMsgs() {
                this.errMsg = "";
                this.successMsg = "";
            },

            selectBook(std) {
                this.currentBook = std;
            },

            async getBookData() {
                let res = await axios.get(
                    `https://appmobyes.000webhostapp.com/crud/readBuku.php`
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        this.bookData = restData.book;
                        this.errMsg = restData.messages;
                    }
                }
            },

            async addNewBook() {
                this.clearOldMsgs();
                this.v$.newBook.$validate();
                if (!this.v$.newBook.$error) {
                    this.addModalDialog(false);
                    let formData = this.toFormData(this.newBook);
                    let res = await axios.post(
                        `https://appmobyes.000webhostapp.com/crud/createBuku.php`,
                        formData
                    );
                    const restData = res.data;
                    if (res.status == 200) {
                        if (restData.error) {
                            this.errMsg = restData.message;
                        } else {
                            this.newBook = {
                                isbn: "",
                                judul: "",
                                pengarang: "",
                                abstrak: "",
                                tanggal_terbit: "",
                                penerbit: "",
                            };
                            this.successMsg = restData.message;
                            this.getBookData();
                            this.v$.currentBook.reset;
                        }
                    }
                } else {
                    console.log("failed");
                }
            },

            async deleteBook() {
                var formData = this.toFormData(this.currentBook);
                this.deleteModalDialog(false);
                this.clearOldMsgs();
                let res = await axios.post(
                    `https://appmobyes.000webhostapp.com/crud/deleteBuku.php`,
                    formData
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        let newBook = this.bookData.filter(
                            (ele) => ele.id != this.currentBook.isbn
                        );
                        this.successMsg = restData.message;
                        this.currentBook = {};
                        this.bookData = newBook;
                        this.getBookData();
                    }
                }
            },

            async deleteAllBooks() {
                this.deleteAllModalDialog(false);
                this.clearOldMsgs();
                let res = await axios.post(
                    `https://appmobyes.000webhostapp.com/crud/deleteAllBuku.php`
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        this.errMsg = restData.messages;
                        this.successMsg = restData.message;
                        this.bookData = "";
                    }
                }
            },

            async updateBook() {
                this.v$.currentBook.$validate();
                if (!this.v$.currentBook.$error) {
                    this.updateModalDialog(false);
                    this.clearOldMsgs();
                    let formData = this.toFormData(this.currentBook);

                    let res = await axios.post(
                        `https://appmobyes.000webhostapp.com/crud/updateBuku.php`,
                        formData
                    );
                    const restData = res.data;

                    if (res.status == 200) {
                        if (restData.error) {
                            alert(restData.message);
                            // this.errMsg =
                            window.location.reload();

                            //this.v$.currentBook.reset;
                        } else {
                            //this.currentBook = {};
                            this.successMsg = restData.message;
                            this.getBookData();
                            this.v$.currentBook.reset;
                        }
                    }

                    console.log("updated user");
                } else {
                    console.log("failed to update");
                }
            },
        },
    };
</script>

<style scoped>
    h1 {
        color: white;
        padding: 8px;
        margin-top: 0;
        margin-bottom: 50px;
    }

    #overlay {
        position: fixed;
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgb(0 0 0 / 50%);
    }

    .form-group-error {
        color: red;
    }

    .form-group-error input {
        color: red;
    }
    span {
        display: inline;
    }
</style>
