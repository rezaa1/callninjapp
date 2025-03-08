"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Copy, Save, Trash2, Plus } from "lucide-react";

interface Tool {
  functionName: string;
  description: string;
  serverUrl: string;
  parameters: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
  }>;
}

interface Task {
  name: string;
  enabled: boolean;
  prompt?: string;
}

export default function CreateAgentPage() {
  const [agentConfig, setAgentConfig] = useState({
    welcomeMessage: "Hello! How can I assist you today as a Customer Support?",
    provider: "openai",
    model: "gpt-4o-mini",
    maxTokens: 500,
    voice: "luna",
    audioRecording: true,
    videoRecording: false,
    backgroundDenoising: false,
    backgroundSound: "off",
    voicemailMessage: "Hey! Please call back when you're available.",
    temperature: 0.4,
    smartEndpointing: false,
    waitSeconds: 0.4,
    punctuationSeconds: 0.1,
    noPunctuationSeconds: 1.5,
    numberSeconds: 2.5,
    silenceTimeout: 15,
    maxDuration: 420,
    endCallMessage: "Thank you for contacting. Have a great day!",
    endCallPhrases: ["goodbye"],
    endCallFunctionEnabled: false
  });

  const [tasks, setTasks] = useState<Task[]>([
    { name: "Summarization", enabled: false },
    { name: "Extraction", enabled: false },
    { name: "Call Success Evaluation", enabled: true, prompt: "Based on the conversation Identify whether the user has one of the following intentions.\n- completed purchase,\n- follow - up needed\n- no interest" }
  ]);

  const [tools, setTools] = useState<Tool[]>([{
    functionName: "",
    description: "",
    serverUrl: "",
    parameters: []
  }]);

  const [newParameter, setNewParameter] = useState({
    name: "",
    type: "String",
    description: "",
    required: false
  });

  const addParameter = (toolIndex: number) => {
    if (!newParameter.name || !newParameter.description) return;
    
    const updatedTools = [...tools];
    updatedTools[toolIndex].parameters.push({...newParameter});
    setTools(updatedTools);
    
    setNewParameter({
      name: "",
      type: "String",
      description: "",
      required: false
    });
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].enabled = !updatedTasks[index].enabled;
    setTasks(updatedTasks);
  };

  const updateTaskPrompt = (index: number, prompt: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].prompt = prompt;
    setTasks(updatedTasks);
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">test</h1>
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <Tabs defaultValue="agent-details" className="space-y-6">
          <TabsList className="space-x-2">
            <TabsTrigger value="agent-details">Agent Details</TabsTrigger>
            <TabsTrigger value="transcriber">Transcriber</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="call">Call</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
            <TabsTrigger value="functions">Functions</TabsTrigger>
          </TabsList>

          <TabsContent value="agent-details">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Agent Welcome Message</Label>
                  <Input
                    value={agentConfig.welcomeMessage}
                    onChange={(e) => setAgentConfig({...agentConfig, welcomeMessage: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Agent Prompt</Label>
                  <Textarea
                    className="min-h-[300px]"
                    placeholder="Enter the agent's prompt..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Select value={agentConfig.provider}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={agentConfig.model}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o-mini">GPT-4O Mini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Max Token</Label>
                  <Input
                    type="number"
                    value={agentConfig.maxTokens}
                    onChange={(e) => setAgentConfig({...agentConfig, maxTokens: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Knowledge Base</Label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">No files selected</p>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="voice">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={false}
                      onCheckedChange={() => {}}
                    />
                    <Label>Add Voice ID Manually</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Voice</Label>
                  <Select value={agentConfig.voice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luna">Luna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Audio Recording</Label>
                      <Switch
                        checked={agentConfig.audioRecording}
                        onCheckedChange={(checked) => setAgentConfig({...agentConfig, audioRecording: checked})}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Record the conversation with the assistant.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Background Denoising</Label>
                      <Switch
                        checked={agentConfig.backgroundDenoising}
                        onCheckedChange={(checked) => setAgentConfig({...agentConfig, backgroundDenoising: checked})}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Filter background noise while the user is talking.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Sound</Label>
                  <Select value={agentConfig.backgroundSound}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Video Recording</Label>
                    <Switch
                      checked={agentConfig.videoRecording}
                      onCheckedChange={(checked) => setAgentConfig({...agentConfig, videoRecording: checked})}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">This will record the video of your user.</p>
                </div>

                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Slider
                    value={[agentConfig.temperature]}
                    max={1}
                    step={0.1}
                    onValueChange={([value]) => setAgentConfig({...agentConfig, temperature: value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    Increasing temperature enables heightened creativity, but increases chance of deviation from prompt
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="call">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Silence Timeout</Label>
                  <Slider
                    value={[agentConfig.silenceTimeout]}
                    max={30}
                    step={1}
                    onValueChange={([value]) => setAgentConfig({...agentConfig, silenceTimeout: value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to wait before a call is automatically ended due to inactivity.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Duration</Label>
                  <Slider
                    value={[agentConfig.maxDuration]}
                    max={900}
                    step={30}
                    onValueChange={([value]) => setAgentConfig({...agentConfig, maxDuration: value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    The maximum number of seconds a call will last.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>End Call Message</Label>
                  <Input
                    value={agentConfig.endCallMessage}
                    onChange={(e) => setAgentConfig({...agentConfig, endCallMessage: e.target.value})}
                    placeholder="Message to be played before ending the call"
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Call Phrases</Label>
                  <div className="flex gap-2 flex-wrap">
                    {agentConfig.endCallPhrases.map((phrase, index) => (
                      <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {phrase}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>End Call Function</Label>
                    <Switch
                      checked={agentConfig.endCallFunctionEnabled}
                      onCheckedChange={(checked) => setAgentConfig({...agentConfig, endCallFunctionEnabled: checked})}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the end call functionality.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="task">
            <Card className="p-6">
              <div className="space-y-6">
                {tasks.map((task, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={task.enabled}
                        onCheckedChange={() => toggleTask(index)}
                      />
                      <Label>{task.name}</Label>
                    </div>
                    {task.enabled && task.name === "Call Success Evaluation" && (
                      <div className="space-y-2">
                        <Label>Define criteria to evaluate conversation success and user intentions</Label>
                        <Textarea
                          value={task.prompt}
                          onChange={(e) => updateTaskPrompt(index, e.target.value)}
                          className="min-h-[150px]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="functions">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Tool Configuration</h2>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tool
                  </Button>
                </div>

                {tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="space-y-4 border rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Function Name</Label>
                        <Input
                          placeholder="e.g., check_availability"
                          value={tool.functionName}
                          onChange={(e) => {
                            const updatedTools = [...tools];
                            updatedTools[toolIndex].functionName = e.target.value;
                            setTools(updatedTools);
                          }}
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe what this tool does..."
                          value={tool.description}
                          onChange={(e) => {
                            const updatedTools = [...tools];
                            updatedTools[toolIndex].description = e.target.value;
                            setTools(updatedTools);
                          }}
                        />
                      </div>

                      <div>
                        <Label>Server URL</Label>
                        <Input
                          placeholder="https://vorestaurant.customerdemoyrl.com/api/restaurant-details/org_****"
                          value={tool.serverUrl}
                          onChange={(e) => {
                            const updatedTools = [...tools];
                            updatedTools[toolIndex].serverUrl = e.target.value;
                            setTools(updatedTools);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Parameters</Label>
                        {tool.parameters.map((param, paramIndex) => (
                          <div key={paramIndex} className="flex gap-2 items-center bg-secondary p-2 rounded">
                            <div className="flex-1">{param.name}</div>
                            <div className="flex-1">{param.type}</div>
                            <div className="flex-1">{param.description}</div>
                            <div className="w-24">{param.required ? "Required" : "Optional"}</div>
                          </div>
                        ))}

                        <div className="mt-4">
                          <Label>Add New Parameter</Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              placeholder="Parameter name"
                              value={newParameter.name}
                              onChange={(e) => setNewParameter({...newParameter, name: e.target.value})}
                            />
                            <Select
                              value={newParameter.type}
                              onValueChange={(value) => setNewParameter({...newParameter, type: value})}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="String">String</SelectItem>
                                <SelectItem value="Number">Number</SelectItem>
                                <SelectItem value="Boolean">Boolean</SelectItem>
                                <SelectItem value="Array">Array</SelectItem>
                                <SelectItem value="Object">Object</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Parameter description"
                              value={newParameter.description}
                              onChange={(e) => setNewParameter({...newParameter, description: e.target.value})}
                            />
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={newParameter.required}
                                onCheckedChange={(checked) => setNewParameter({...newParameter, required: checked})}
                              />
                              <Label>Required</Label>
                            </div>
                            <Button
                              onClick={() => addParameter(toolIndex)}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}