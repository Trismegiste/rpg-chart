<spa>
    <div class="pure-g">
        <div class="pure-u-3-4"><div id="chart"></div></div>
        <div class="pure-u-1-4">
            <form onsubmit="{
                        onAddVertex
                    }" class="pure-form">
                <input type="text" class="pure-input-1" name="vertexname"/>
                <button class="pure-button pure-button-primary">Add</button>
            </form>
        </div>
    </div>

    <script>
        var graph;
        var self = this

        onAddVertex() {
            self.graph.addNode(self.vertexname.value)
        }

        this.on('mount', function () {
            var w = document.getElementById('chart').clientWidth
            var h = window.innerHeight * 0.8
            self.graph = new Digraph("#chart", w, h);

            self.graph.addNode('Sophia');
            self.graph.addNode('Daniel');
            self.graph.addNode('Ryan');
            self.graph.addNode('Lila');
            self.graph.addNode('Suzie');
            self.graph.addNode('Riley');
            self.graph.addNode('Grace');
            self.graph.addNode('Dylan');
            self.graph.addNode('Mason');
            self.graph.addNode('Em ma');
            self.graph.addNode('Alex');
            self.graph.addLink('Alex', 'Ryan', 'ami');
            self.graph.addLink('Sophia', 'Ryan', 'stalke');
            self.graph.addLink('Daniel', 'Ryan', 'enemi');
            self.graph.addLink('Ryan', 'Lila', 'surveille');
            self.graph.addLink('Lila', 'Suzie', 'boz');
            self.graph.addLink('Suzie', 'Riley', 'couille');
            self.graph.addLink('Suzie', 'Grace', 'fait partie');
            self.graph.addLink('Grace', 'Dylan', 'wesh');
            self.graph.addLink('Dylan', 'Mason', 'truc');
            self.graph.addLink('Dylan', 'Em ma', 'boz boz');
            self.graph.addLink('Em ma', 'Mason', 'tei');

            // callback for the changes in the network
            var step = -1;
            function nextval()
            {
                step++;
                return 5000 + (1500 * step); // initial time, wait time
            }

            setTimeout(function () {
                self.graph.addLink('Alex', 'Sophia', '20');
            }, nextval());

            setTimeout(function () {
                self.graph.addLink('Sophia', 'Daniel', '20');
            }, nextval());

            setTimeout(function () {
                self.graph.addLink('Daniel', 'Alex', '20');
            }, nextval());

            setTimeout(function () {
                self.graph.addLink('Suzie', 'Daniel', '30');
            }, nextval());

            setTimeout(function () {
                self.graph.removeLink('Dylan', 'Mason');
                self.graph.addLink('Dylan', 'Mason', '8');
            }, nextval());

            setTimeout(function () {
                self.graph.removeLink('Dylan', 'Em ma');
                self.graph.addLink('Dylan', 'Em ma', '8');
            }, nextval());
        })
    </script>
</spa>
