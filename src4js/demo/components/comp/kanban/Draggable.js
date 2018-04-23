import React from 'react';


export default class Draggable extends React.Component {
    componentDidMount() {
        let $this = $(this.refs._container)
        let handle = $this.find(this.props.handle)
        handle.mousedown((e) => {
            let startX = e.clientX;
            let startY = e.clientY;
            let offset = $this.offset();
            $this.css({ position: 'fixed', ...offset, width: $this.width(), height: $this.height() });
            this.props.onStart && this.props.onStart(e, { $target: $this });
            $(document).mousemove((e) => {
                if (this.props.axis == 'x') {
                    let offsetX = e.clientX - startX;
                    $this.css({ left: offset.left + offsetX });
                } else if (this.props.axis == 'y') {
                    let offsetY = e.clientY - startY;
                    $this.css({ top: offset.top + offsetY });
                } else {
                    let offsetX = e.clientX - startX;
                    let offsetY = e.clientY - startY;
                    $this.css({ left: offset.left + offsetX, top: offset.top + offsetY });
                }
                this.props.onDrag && this.props.onDrag({ target: this.refs._container });
            }).mouseup(() => {
                $(document).unbind('mousemove');
                this.props.onStop && this.props.onStop({ target: this.refs._container });
                $this.removeAttr("style");
                return false;
            })
            return false;
        });
    }
    render() {
        return (
            <div ref="_container"
                id={this.props.id}
                className={`${this.props.defaultClassName} ${this.props.className}`}>
                {this.props.children}
            </div>
        )
    }
}