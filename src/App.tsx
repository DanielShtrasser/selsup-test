import { Component } from "react";
import "./App.css";

type ParamType = "string";

interface Param {
  id: number;
  name: string;
  type: ParamType;
  options?: string[];
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Model["paramValues"];
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

const App = () => {
  return (
    <div>
      <h1>Редактирование параметров товара</h1>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleInputChange = (paramId: number, value: string) => {
    this.setState((prevState) => {
      const updatedParamValues = prevState.paramValues.map((paramValue) => {
        if (paramValue.paramId === paramId) {
          return { ...paramValue, value };
        }
        return paramValue;
      });

      return { paramValues: updatedParamValues };
    });
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div className="list">
        {params.map((param) => {
          const paramValue = paramValues.find((p) => p.paramId === param.id);

          return (
            <div key={param.id} className="item">
              <label>{param.name}</label>
              {param.type === "string" && (
                <input
                  type="text"
                  value={paramValue ? paramValue.value : ""}
                  onChange={(e) =>
                    this.handleInputChange(param.id, e.target.value)
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
