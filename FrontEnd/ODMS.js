class MyHeader extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <header>
        <img class="logo" style="size : 1px;" src="image/logo.png" alt="BE A HERO" >
            <nav class="pages">
                <a class="home" href="ODMS.html">Home</a>
                <a class="dR" href="http://localhost:8000/">Donors Registration</a>
                <a class="hospital" href="hospitalForm.html">Hospital</a>
                <a class="admin" href="admin.html">Admin</a>
            </nav>
        </header>
        `
    }
}

customElements.define('my-header',MyHeader)