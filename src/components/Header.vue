<template>
    <header>
        <router-link to="/">Home</router-link>   
        <div id="credits">Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a>, <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a>, <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> and <a href="https://www.flaticon.com/authors/rami-mcmin" title="Rami McMin">Rami McMin</a>  from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>     
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Header extends Vue {
  // region public members
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
header {
    background-color: rgba(54, 53, 51, 0.95);
}

#credits {
    float: right;
    margin: 21px 21px 0 0;
    font-size: 12px;
}

#credits, a {
    color: gray;
    text-decoration: none;
}
</style>
