class MyHeader extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <header>
            <h2 class="OD">ORGAN DONATION</h2>
            <nav class="pages">
                <a class="home" href="ODMS.html">Home</a>
                <a class="dR" href="http://localhost:8000/">Donors Registration</a>
                <a class="hospital" href="FrontEnd/hospitalForm.html">Hospital</a>
                <a class="admin" href="FrontEnd/admin.html">Admin</a>
            </nav>
        </header>
        `
    }
}

customElements.define('my-header',MyHeader)