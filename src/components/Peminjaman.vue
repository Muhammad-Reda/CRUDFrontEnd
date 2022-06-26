<template>
    <div>
        <h1 class="text-center">CRUD</h1>
    </div>

    <div class="container">
        <!-- Show Add, delete all catatan Button -->
        <div class="col-lg-12">
            <button
                class="float-end btn btn-info"
                @click="addModalDialog(true)"
            >
                <FIcons :icon="['fas', 'plus']" /> Tambah catatan
            </button>
            <button
                class="float-start btn btn-danger"
                v-if="catatanData.length > 0"
                @click="deleteAllModalDialog(true)"
            >
                <FIcons :icon="['fas', 'trash']" /> Hapus semua catatan
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

        <!-- Show  catatan Details : Tables -->
        <table class="table table-border table-striped caption-top">
            <caption>
                Banyak catatan ({{
                    catatanData.length
                }})
            </caption>
            <thead>
                <tr class="bg-success text-light text-center">
                    <th>Kode</th>
                    <th>nama Peminjam</th>
                    <th>NIS</th>
                    <th>Judul buku</th>
                    <th>ISBN</th>
                    <th>Tanggal Peminjaman</th>
                    <th><FIcons :icon="['fas', 'cog']" />Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="text-center"
                    v-for="(catatans, i) in catatanData"
                    :key="i"
                >
                    <td>{{ catatans.kode }}</td>
                    <td>{{ catatans.nama_peminjam }}</td>
                    <td>{{ catatans.nis }}</td>
                    <td>{{ catatans.judul }}</td>
                    <td>{{ catatans.isbn }}</td>
                    <td>{{ catatans.tanggal_peminjaman }}</td>
                    <td>
                        <button
                            class="btn btn-danger"
                            @click="
                                deleteModalDialog(true);
                                selectCatatan(catatans);
                            "
                        >
                            <FIcons :icon="['fas', 'minus']" /> Hapus
                        </button>
                        <button
                            class="btn btn-warning"
                            @click="
                                updateModalDialog(true);
                                selectCatatan(catatans);
                            "
                        >
                            <FIcons :icon="['fas', 'edit']" /> Update
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Show  Add New catatan Modal -->
        <div id="overlay" v-if="showAddModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-info">
                            Tambah catatan baru
                        </h5>
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
                                    'form-group-error':
                                        v$.newCatatan.kode.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNisFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newCatatan.kode"
                                />
                                <label for="studentNisFloat"> Kode </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newCatatan.kode.$error"
                                    >{{
                                        v$.newCatatan.kode.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newCatatan.nama_peminjam.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNisnFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newCatatan.nama_peminjam"
                                />
                                <label for="studentNisnFloat">
                                    Nama Peminjam
                                </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newCatatan.nama_peminjam.$error"
                                    >{{
                                        v$.newCatatan.nama_peminjam.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newCatatan.nis.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentNameFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newCatatan.nis"
                                />
                                <label for="studentNameFloat">NIS </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newCatatan.nis.$error"
                                    >{{
                                        v$.newCatatan.nis.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newCatatan.judul.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentTLFloat"
                                    placeholder="2002-10-20"
                                    v-model.trim="newCatatan.judul"
                                />
                                <label for="studentTLFloat"> Judul buku </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newCatatan.judul.$error"
                                    >{{
                                        v$.newCatatan.judul.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newCatatan.isbn.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentisbnFloat"
                                    placeholder="Islam"
                                    v-model.trim="newCatatan.isbn"
                                />
                                <label for="studentisbnFloat"> isbn</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newCatatan.isbn.$error"
                                    >{{
                                        v$.newCatatan.isbn.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6 input-group date"
                                data-provide="datepicker"
                                :class="{
                                    'form-group-error':
                                        v$.newCatatan.tanggal_peminjaman.$error,
                                }"
                            >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="studenttanggal_peminjamanFloat"
                                    placeholder="Pekanbaru"
                                    v-model.trim="newCatatan.tanggal_peminjaman"
                                />
                                <label for="studenttanggal_peminjamanFloat">
                                    tanggal_peminjaman</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="
                                        v$.newCatatan.tanggal_peminjaman.$error
                                    "
                                    >{{
                                        v$.newCatatan.tanggal_peminjaman
                                            .$errors[0].$message
                                    }}</span
                                >
                            </div>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-info"
                                    @click="addNewCatatan()"
                                >
                                    Tambah catatan baru</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Edit catatan Modal -->
        <div id="overlay" v-if="showUpdateModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-warning">Update catatan</h5>
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
                                        v$.currentCatatan.kode.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentNisFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentCatatan.kode"
                                />
                                <label for="studentNisFloat">Kode </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentCatatan.kode.$error"
                                    >{{
                                        v$.currentCatatan.kode.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentCatatan.nama_peminjam.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNisnFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentCatatan.nama_peminjam"
                                />
                                <label for="studentNisnFloat">
                                    Nama Peminjam
                                </label>
                                <span
                                    class="error-feedback"
                                    v-if="
                                        v$.currentCatatan.nama_peminjam.$error
                                    "
                                    >{{
                                        v$.currentCatatan.nama_peminjam
                                            .$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentCatatan.nis.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNameFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentCatatan.nis"
                                />
                                <label for="studentNameFloat"> NIS</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentCatatan.nis.$error"
                                    >{{
                                        v$.currentCatatan.nis.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentCatatan.judul.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentTLFloat"
                                    placeholder="2002-10-20"
                                    v-model.trim="currentCatatan.judul"
                                />
                                <label for="studentTLFloat"> judul buku </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentCatatan.judul.$error"
                                    >{{
                                        v$.currentCatatan.judul.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentCatatan.isbn.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentisbnFloat"
                                    placeholder="Islam"
                                    v-model.trim="currentCatatan.isbn"
                                />
                                <label for="studentisbnFloat"> isbn</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentCatatan.isbn.$error"
                                    >{{
                                        v$.currentCatatan.isbn.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.currentCatatan.tanggal_peminjaman
                                            .$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studenttanggal_peminjamanFloat"
                                    placeholder="Pekanbaru"
                                    v-model.trim="
                                        currentCatatan.tanggal_peminjaman
                                    "
                                />
                                <label for="studenttanggal_peminjamanFloat">
                                    tanggal_peminjaman</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="
                                        v$.currentCatatan.tanggal_peminjaman
                                            .$error
                                    "
                                    >{{
                                        v$.currentCatatan.tanggal_peminjaman
                                            .$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-warning"
                                    @click="updateCatata()"
                                >
                                    Update Catatan</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Delete catatan Modal -->
        <div id="overlay" v-if="showDeleteModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">Hapus Catatan</h5>
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
                                Apakah kamu yakin untuk menghapus catatan ini?
                            </h6>

                            <p>
                                <span>Kode : {{ currentCatatan.kode }}</span
                                ><br />
                                <span
                                    >Nama peminjam :
                                    {{ currentCatatan.nama_peminjam }}</span
                                ><br />
                                <span>NIS : {{ currentCatatan.nis }}</span
                                ><br />
                                <span
                                    >Judul buku :
                                    {{ currentCatatan.judul }}</span
                                ><br />
                                <span>ISBN : {{ currentCatatan.isbn }}</span
                                ><br />
                                <span
                                    >Tanggal peminjaman :
                                    {{
                                        currentCatatan.tanggal_peminjaman
                                    }}</span
                                ><br />
                            </p>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-danger"
                                    @click="deleteCatatan()"
                                >
                                    Ya, hapus catatan</buttn
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

        <!-- Show  Delete All catatan Modal -->
        <div id="overlay" v-if="showDeleteAllModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">
                            Hapus semua catatan
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
                                Apakah kamu yakin untuk menghapus semua catatan?
                            </h6>

                            <p>Seluruh data catatan akan hilang permanen</p>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-danger"
                                    @click="deleteAllCatatan()"
                                >
                                    Hapus semua catatan</buttn
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
        name: "Peminjaman",
        data() {
            return {
                v$: useValidate(),
                errMsg: "",
                successMsg: "",
                isDBConnected: "",
                isDBConnectedMsg: "",
                catatanData: [],
                showAddModal: false,
                showUpdateModal: false,
                showDeleteModal: false,
                showDeleteAllModal: false,
                newCatatan: {
                    kode: "",
                    nama_peminjam: "",
                    nis: "",
                    judul: "",
                    isbn: "",
                    tanggal_peminjaman: "",
                },
                currentCatatan: {},
            };
        },

        validations() {
            return {
                newCatatan: {
                    kode: {
                        required,
                        minLength: minLength(1),
                        maxLength: maxLength(255),
                    },
                    nama_peminjam: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(255),
                    },
                    nis: {
                        required,
                        minLength: minLength(1),
                        maxLength: maxLength(20),
                    },
                    judul: {
                        required,
                        minLength: minLength(1),
                        maxLength: maxLength(255),
                    },
                    isbn: {
                        required,
                        minLength: minLength(1),
                        maxLength: maxLength(20),
                    },
                    tanggal_peminjaman: {
                        required,
                        minLength: minLength(4),
                        maxLength: maxLength(10),
                    },
                },
                currentCatatan: {
                    kode: { required, minLength: minLength(1) },
                    nama_peminjam: { required, minLength: minLength(3) },
                    nis: { required, minLength: minLength(1) },
                    judul: { required, minLength: minLength(1) },
                    isbn: { required, minLength: minLength(1) },
                    tanggal_peminjaman: { required, minLength: minLength(4) },
                },
            };
        },

        mounted() {
            this.getcatatanData();
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

            selectCatatan(std) {
                this.currentCatatan = std;
            },

            async getcatatanData() {
                let res = await axios.get(
                    `https://appmobyes.000webhostapp.com/crud/readCatatan.php`
                );
                const restData = res.data;
                console.log(restData);
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        this.catatanData = restData.catatans;
                        this.errMsg = restData.messages;
                    }
                }
            },

            async deleteAllCatatan() {
                this.deleteAllModalDialog(false);
                this.clearOldMsgs();
                let res = await axios.post(
                    `https://appmobyes.000webhostapp.com/crud/deleteAllCatatan.php`
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        this.errMsg = restData.messages;
                        this.successMsg = restData.message;
                        this.catatanData = "";
                    }
                }
            },

            async deleteCatatan() {
                var formData = this.toFormData(this.currentCatatan);
                this.deleteModalDialog(false);
                this.clearOldMsgs();
                let res = await axios.post(
                    `https://appmobyes.000webhostapp.com/crud/deleteCatatan.php`,
                    formData
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        let newCatatanData = this.catatanData.filter(
                            (ele) => ele.id != this.currentCatatan.nis
                        );
                        this.successMsg = restData.message;
                        this.currentCatatan = {};
                        this.catatanData = newCatatanData;
                        this.getcatatanData();
                    }
                }
            },

            async addNewCatatan() {
                this.clearOldMsgs();
                this.v$.newCatatan.$validate();
                if (!this.v$.newCatatan.$error) {
                    this.addModalDialog(false);
                    console.log("validated");
                    let formData = this.toFormData(this.newCatatan);
                    let res = await axios.post(
                        `https://appmobyes.000webhostapp.com/crud/createCatatan.php`,
                        formData
                    );
                    const restData = res.data;
                    if (res.status == 200) {
                        if (restData.error) {
                            this.errMsg = restData.message;
                        } else {
                            this.newCatatan = {
                                kode: "",
                                nama_peminjam: "",
                                nis: "",
                                judul: "",
                                isbn: "",
                                tanggal_peminjaman: "",
                            };
                            this.successMsg = restData.message;
                            this.getcatatanData();
                            this.v$.currentCatatan.reset;
                        }
                    }
                } else {
                    console.log("failed");
                }
            },
            async updateCatata() {
                this.v$.currentCatatan.$validate();
                if (!this.v$.currentCatatan.$error) {
                    this.updateModalDialog(false);
                    this.clearOldMsgs();
                    let formData = this.toFormData(this.currentCatatan);

                    let res = await axios.post(
                        `https://appmobyes.000webhostapp.com/crud/updateCatatan.php`,
                        formData
                    );
                    const restData = res.data;

                    if (res.status == 200) {
                        if (restData.error) {
                            alert(restData.message);
                            // this.errMsg =
                            window.location.reload();

                            //this.v$.currentCatatan.reset;
                        } else {
                            //this.currentCatatan = {};
                            this.successMsg = restData.message;
                            this.getcatatanData();
                            this.v$.currentCatatan.reset;
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
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgb(0 0 0 / 47%);
    }

    .form-group-error {
        color: red;
    }

    .form-group-error input {
        color: red;
    }
</style>
