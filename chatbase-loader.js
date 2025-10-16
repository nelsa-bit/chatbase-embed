(function() {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        // Queue function before actual script loads
        window.chatbase = (...args) => {
            if (!window.chatbase.q) window.chatbase.q = [];
            window.chatbase.q.push(args);
        };

        // Proxy to handle dynamic calls
        window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
                if (prop === "q") return target.q;
                return (...args) => target(prop, ...args);
            }
        });
    }

    // Function to load Chatbase embed script
    const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js"; // Chatbase public script
        script.id = "CGIOn5tQfnrvOW9BQlcSc"; // optional, can change
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
        onLoad();
    } else {
        window.addEventListener("load", onLoad);
    }
})();
