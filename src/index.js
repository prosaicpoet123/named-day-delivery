import ReactHabitat                 from 'react-habitat';
import SomeReactComponent           from './some-react-component';

class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // Create a new container builder:
        const builder = new ReactHabitat.ContainerBuilder();

        // Register a component:
        builder.register(SomeReactComponent).as('SomeReactComponent');

        // Or register a component to load on demand asynchronously:
        // builder.registerAsync(() => System.import('./AnotherReactComponent')).as('AnotherReactComponent');

        // Finally, set the container:
        this.setContainer(builder.build());
    }
}

// Always export a 'new' instance so it immediately evokes:
export default new MyApp();