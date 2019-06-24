import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || function() {
    return {
<<<<<<< HEAD
        matches : false,
        addListener : function() {},
        removeListener: function() {}
=======
    matches : false,
    addListener : function() {},
    removeListener: function() {}
>>>>>>> master
    };
};