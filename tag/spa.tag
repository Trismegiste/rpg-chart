<spa>
    <div id="chart"></div>

    <script>

        this.on('mount', function () {
            console.log(document.getElementById('chart'))
            console.log(window.innerHeight, window.innerWidth)
            var graph = new Digraph("#chart", 960, 450);

            graph.addNode('Sophia');
            graph.addNode('Daniel');
            graph.addNode('Ryan');
            graph.addNode('Lila');
            graph.addNode('Suzie');
            graph.addNode('Riley');
            graph.addNode('Grace');
            graph.addNode('Dylan');
            graph.addNode('Mason');
            graph.addNode('Emma');
            graph.addNode('Alex');
            graph.addLink('Alex', 'Ryan', 'ami');
            graph.addLink('Sophia', 'Ryan', 'stalke');
            graph.addLink('Daniel', 'Ryan', 'enemi');
            graph.addLink('Ryan', 'Lila', 'surveille');
            graph.addLink('Lila', 'Suzie', 'boz');
            graph.addLink('Suzie', 'Riley', 'couille');
            graph.addLink('Suzie', 'Grace', 'fait partie');
            graph.addLink('Grace', 'Dylan', 'wesh');
            graph.addLink('Dylan', 'Mason', 'truc');
            graph.addLink('Dylan', 'Emma', 'boz boz');
            graph.addLink('Emma', 'Mason', 'tei');

            // callback for the changes in the network
            var step = -1;
            function nextval()
            {
                step++;
                return 5000 + (1500 * step); // initial time, wait time
            }

            setTimeout(function () {
                graph.addLink('Alex', 'Sophia', '20');
            }, nextval());

            setTimeout(function () {
                graph.addLink('Sophia', 'Daniel', '20');
            }, nextval());

            setTimeout(function () {
                graph.addLink('Daniel', 'Alex', '20');
            }, nextval());

            setTimeout(function () {
                graph.addLink('Suzie', 'Daniel', '30');
            }, nextval());

            setTimeout(function () {
                graph.removeLink('Dylan', 'Mason');
                graph.addLink('Dylan', 'Mason', '8');
            }, nextval());

            setTimeout(function () {
                graph.removeLink('Dylan', 'Emma');
                graph.addLink('Dylan', 'Emma', '8');
            }, nextval());
        })
    </script>
</spa>
